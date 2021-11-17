export default class BikeService {  
  static async getBikes(location) {
    try {
      const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=1&location=${location}&distance=10&stolenness=proximity`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}