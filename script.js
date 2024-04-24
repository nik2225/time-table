// script.js

document.getElementById('scheduleForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    try {
        const response = await axios.post('/schedule', {
            subjectName: formData.get('subjectName'),
            teachingStaff: formData.get('teachingStaff'),
            lecturesPerWeek: parseInt(formData.get('lecturesPerWeek')),
            lectureDuration: parseInt(formData.get('lectureDuration'))
        });
        
        document.getElementById('message').textContent = response.data;
        this.reset();
    } catch (error) {
        console.error(error);
    }
});
