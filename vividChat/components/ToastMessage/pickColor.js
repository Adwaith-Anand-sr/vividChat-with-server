const pickColor = () => {
   const colours = ['#57f2ef', '#e205b7f5', '#8df9e4f5', '#8d40dcf5', '#bbffcbf5', '#800080f2', '#ffc0cbf6', '#add8e6f2'];
   const randomIndex = Math.floor(Math.random() * colours.length);
   return colours[randomIndex];
}

export default pickColor;
