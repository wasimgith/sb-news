export const loadUpvote = () => {
    try {
      const serializedState = localStorage.getItem('upvote');
      if (serializedState === null) {
        return undefined;
      }
      
      return JSON.parse(serializedState);

    } catch (err) {
      return undefined;
    }
  };
  
  export const saveUpvote = (upvote) => {
    try {
      const serializedState = JSON.stringify(upvote);
      localStorage.setItem('upvote', serializedState);
    } catch (err) {
      console.log(err)
    }
  };

  export const loadHide = () => {
    try {
      const serializedState = localStorage.getItem('hide');
      if (serializedState === null) {
        return undefined;
      }
      
      return JSON.parse(serializedState);

    } catch (err) {
      return undefined;
    }
  };
  
  export const saveHide = (hide) => {
    try {
      const serializedState = JSON.stringify(hide);
      localStorage.setItem('hide', serializedState);
    } catch (err) {
      console.log(err)
    }
  };