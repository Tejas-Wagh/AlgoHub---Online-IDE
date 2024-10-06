import axios from "axios";

export async function createSubmission(code:string, input:string,language_id:number){
  const axios = require('axios');

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: {
      base64_encoded: 'true',
      wait: 'false',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_SECRET_KEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      language_id: language_id,
      source_code: btoa(code),
      stdin: btoa(input)
    }
  };
  
  try {
    const response = await axios.request(options);
    const data= await response.data;
    let result = await getSubmission(data.token);

    //@ts-ignore
     while(result.status_id == 1 || result.status_id == 2){
      
      result = await getSubmission(data.token);
    }


    
    //@ts-ignore
    if(result.status_id == 3){
      return {
        status:"Accepted",
        //@ts-ignore
        output:atob(result?.stdout)
      }
    }else{
      return {status:"Error",
              //@ts-ignore
            description:atob(result.compile_output) as string
      }
    }
    

  } catch (error) {
    return {status:"Error",
      //@ts-ignore
    description:"An error occured!"
}
  }
}


export async function getSubmission(token:string){
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/'+token,
  params: {
    base64_encoded: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_SECRET_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	const data= await response.data;
  return data;
} catch (error) {
	console.error(error);
}
}