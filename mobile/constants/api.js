import { Platform } from 'react-native';

// Use your laptop's IP for mobile, localhost for web
export const API_URL = Platform.OS === 'web' 
  ? "http://localhost:5001/api"           // For web browser
  : "http://10.62.106.16:5001/api";       // For  physical mobile testing - your laptop's IP


  // const API_URL = "http://localhost:5001/api";

// for real project host backend on any service like render and from that copy  the url and use like this 
// const API_URL="http://url/api"    like this