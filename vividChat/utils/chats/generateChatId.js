const generateChatId = (userId1, userId2) => {
   if(userId1 && userId2) return [userId1, userId2].sort().join("_");
};

export default generateChatId;