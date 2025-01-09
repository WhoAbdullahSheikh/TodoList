import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import { useTodoContext } from '../context/TodoContext';
import { RadioButton } from 'react-native-paper';  
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import the modal picker
import LottieView from 'lottie-react-native'; // Import LottieView
import Icon from 'react-native-vector-icons/SimpleLineIcons'; // Importing MaterialIcons
import Icon2 from 'react-native-vector-icons/Foundation'; // Importing MaterialIcons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing MaterialIcons

const AddTaskScreen = ({ navigation }) => {
  const { addTodo } = useTodoContext();

  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('Notes'); // Default category is 'Notes'
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);  
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  
  // Modal state for custom alert
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = () => {
    if (taskTitle.trim() === '' || priority.trim() === '' || category.trim() === '' || date.trim() === '' || time.trim() === '') {
      // Show error modal if validation fails
      setErrorMessage('Please fill in all fields');
      setModalVisible(true);
    } else {
      addTodo({
        title: taskTitle,
        priority,
        category,
        date,
        time,
        notes,
      });
      navigation.goBack();
    }
  };

  const formatDate = (selectedDate) => {
    const dateObj = new Date(selectedDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateSelect = (date) => {
    setDate(formatDate(date));
    setDatePickerVisibility(false); // Hide the date picker after selection
  };

  const handleTimeSelect = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    setTime(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
    setTimePickerVisibility(false); // Hide the time picker after selection
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>Add New Task</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            placeholderTextColor="#bbb"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
        </View>
        
        <View style={styles.categoryContainer}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryIcons}>
            <TouchableOpacity onPress={() => setCategory('Notes')} style={[styles.iconCircle, { borderColor: category === 'Notes' ? '#4CAF50' : '#bbb' }]}>
              <Icon2 name="clipboard-notes" size={30} color={category === 'Notes' ? '#4CAF50' : '#bbb'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory('Goals')} style={[styles.iconCircle, { borderColor: category === 'Goals' ? '#FFC107' : '#bbb' }]}>
              <Icon name="trophy" size={30} color={category === 'Goals' ? '#FFC107' : '#bbb'} />     
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory('Reminder')} style={[styles.iconCircle, { borderColor: category === 'Reminder' ? '#FF5722' : '#bbb' }]}>
              <Icon3 name="calendar" size={30} color={category === 'Reminder' ? '#FF5722' : '#bbb'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.radioGroup}>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="Low"
                status={priority === 'Low' ? 'checked' : 'unchecked'}
                onPress={() => setPriority('Low')}
                color="#4CAF50" 
              />
              <Text style={styles.radioLabel}>Low</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="Moderate"
                status={priority === 'Moderate' ? 'checked' : 'unchecked'}
                onPress={() => setPriority('Moderate')}
                color="#FFC107" 
              />
              <Text style={styles.radioLabel}>Moderate</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="High"
                status={priority === 'High' ? 'checked' : 'unchecked'}
                onPress={() => setPriority('High')}
                color="#FF5722" 
              />
              <Text style={styles.radioLabel}>High</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisibility(true)} 
              style={[styles.input, styles.dateInput]}>
              <Text style={[styles.dateText, { color: date ? '#fff' : '#bbb' }]}>
                {date ? date : 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity
              onPress={() => setTimePickerVisibility(true)}
              style={[styles.input, styles.dateInput]}>
              <Text style={[styles.dateText, { color: time ? '#fff' : '#bbb' }]}>
                {time ? time : 'Select Time'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Add any notes"
            placeholderTextColor="#bbb"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date()}
          onConfirm={handleDateSelect}
          onCancel={() => setDatePickerVisibility(false)}
        />

        {/* Time Picker Modal */}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          date={new Date()}
          onConfirm={handleTimeSelect}
          onCancel={() => setTimePickerVisibility(false)}
        />

        {/* Custom Modal for Validation Errors */}
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            {/* Lottie Animation */}
            <LottieView
              source={require('../../assets/animations/warn.json')} 
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#292929',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowItem: {
    width: '48%',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioGroup: {
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  dateInput: {
    justifyContent: 'center', 
    textAlign: 'center', 
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryIcons: {
    marginTop: 10,
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 100,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLabel: {
    color: '#bbb',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: 'black',
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: 'white',
    top: '40%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  lottieAnimation: {
    width: 120,  
    height: 120,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTaskScreen;
