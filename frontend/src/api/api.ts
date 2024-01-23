//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'https://39f9-2001-bb8-2002-98-bdb3-dd6f-41d1-b4f3.ngrok-free.app';

// GET /subjects
// Returns all of the subjects available.
export async function getSubjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.data as string[];
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
}

// POST /personal/subjects
// Returns all of the subjects that a user with userId has chosen
export async function postPersonalSubjects(userId: string) {
  try {
    const data = {
      userId: userId,
    };

    const response = await fetch(`${API_BASE_URL}/personal/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data as string[];
    } else {
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
}

// POST /personal/subjects/add
// A new subject instance is created. If this subject instance already exists the request ends results in a failure.
export async function addPersonalSubject(userId: string, subjectName: string) {
  try {
    const data = {
      userId: userId,
      subjectName: subjectName,
    };

    const response = await fetch(`${API_BASE_URL}/personal/subjects/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error adding subject:', error);
    throw error;
  }
}

// POST /personal/entries/add
// A new entry is created
export async function addEntry(userId: string, subjectName: string, stressLevel: number) {
  try {
    const data = {
      userId: userId,
      subjectName: subjectName,
      stressLevel: stressLevel,
    };

    const response = await fetch(`${API_BASE_URL}/personal/entries/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error adding entry:', error);
    throw error;
  }
}

/*export async function getSubjectData(subject: string) {
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
}*/

/*export async function postPersonalSubjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/personal/subjects`, {
      method: 'POST',
    });
    const data = await response.json();
    return data.data as string[];
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
}*/