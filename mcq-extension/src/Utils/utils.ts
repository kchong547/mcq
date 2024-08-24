//generic function for checking if two objects are the same
//used to check if responseLists has remain unchanged
//Credit: https://stackoverflow.com/questions/37930303/comparing-two-objects-to-see-if-equal
export const deepEqual = (a: any, b: any) => {
    //check if a and b are referring to the same thing
    if (a === b) {
      return true;
    }
  
    if (
      a == null ||
      typeof a != "object" ||
      b == null ||
      typeof b != "object"
    ) {
      return false;
    }
  
    //count the number of properties in a
    var propsInA = 0,
      propsInB = 0;
  
    for (var prop in a) {
      propsInA += 1;
    }
  
    for (var prop in b) {
      propsInB += 1;
      if (!(prop in a) || !deepEqual(a[prop], b[prop])) return false;
    }
  
    return propsInA === propsInB;
  };