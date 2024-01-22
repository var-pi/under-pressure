const API_BASE_URL = 'http://localhost:8080';

export async function getSubjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects.json`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.data as string[];
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
}

export async function getSubjectData(subject: string) {
  console.log("sin");
  
  try {
    const response = await fetch(`${API_BASE_URL}/entries.json`, {
      method: 'GET',
    });
    const data = await response.json();

    if (Array.isArray(data)) {
      const matchingItem = data.find((item) => {
        return item && item.subject && item.subject === subject;
      });

      if (matchingItem) {
        return matchingItem;
      } else {
        console.log("No matching item found for subject:", subject);
        return null;
      }
    } else {
      console.error('Error: Data is not an array');
      return null;
    }
  } catch (error) {
    console.error('Error fetching subject data:', error);
    throw error;
  }
}
