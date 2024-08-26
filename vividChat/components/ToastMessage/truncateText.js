import { Dimensions } from 'react-native'

const calculateTruncationLength = () => {
  const screenWidth = Dimensions.get('window').width;
  const factor = 0.135; 
  return Math.floor(screenWidth * factor);
};


const truncateText = (text) => {
   let maxLength = calculateTruncationLength()
	return text.length > maxLength
		? text.substring(0, maxLength - 3) + "..."
		: text;
};

export default truncateText;