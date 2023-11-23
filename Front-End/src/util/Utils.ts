export const generateRandomId = (): string => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get current timestamp in milliseconds
  
    // Generate a random number to append to the timestamp
    const randomNumber = Math.floor(Math.random() * 10000);
  
    // Combine timestamp and random number to create the ID
    const id = parseInt(`${timestamp}${randomNumber}`, 10);
  
    return id+"";
  };
  