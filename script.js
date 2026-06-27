// Custom logic for the IFADA Alumni Survey form

document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landingPage');
    const surveyContainer = document.getElementById('surveyContainer');
    const successPage = document.getElementById('successPage');
    const form = document.getElementById('alumniForm');
    
    // UI Elements
    const startBtn = document.getElementById('startBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const consentText = document.getElementById('consentText');
    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');
    
    const sections = document.querySelectorAll('.step-section');
    let currentStep = 1;
    const totalSteps = sections.length;

    // File Upload handling
    const photoInput = document.getElementById('photo');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const fileUploadContainer = document.getElementById('fileUploadContainer');

    if(photoInput) {
        photoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                const fileSize = (e.target.files[0].size / 1024 / 1024).toFixed(2); // in MB
                fileNameDisplay.innerHTML = `<span class="text-brand-600 font-medium">${fileName}</span> (${fileSize} MB)`;
                fileUploadContainer.classList.add('border-brand-500', 'bg-brand-50');
                fileUploadContainer.classList.remove('border-slate-300', 'bg-white/50');
            } else {
                fileNameDisplay.textContent = 'PNG, JPG, GIF up to 10MB';
                fileUploadContainer.classList.remove('border-brand-500', 'bg-brand-50');
                fileUploadContainer.classList.add('border-slate-300', 'bg-white/50');
            }
        });
    }

    // Start Button Logic
    startBtn.addEventListener('click', () => {
        // Fade out landing
        landingPage.classList.add('opacity-0', '-translate-y-4', 'transition-all', 'duration-500');
        
        setTimeout(() => {
            landingPage.classList.add('hidden');
            // Show survey
            surveyContainer.classList.remove('hidden');
            // trigger reflow
            void surveyContainer.offsetWidth;
            surveyContainer.classList.remove('opacity-0');
        }, 500);
    });

    // Update UI based on current step
    function updateFormSteps() {
        sections.forEach(sec => {
            if (parseInt(sec.getAttribute('data-step')) === currentStep) {
                sec.classList.remove('hidden');
                // trigger animation
                sec.classList.remove('opacity-0');
            } else {
                sec.classList.add('hidden');
                sec.classList.add('opacity-0');
            }
        });

        // Update Progress Bar
        progressText.innerText = `${currentStep} / ${totalSteps}`;
        progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;

        // Buttons visibility
        if (currentStep === 1) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
            consentText.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            consentText.classList.add('hidden');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Validate current step before proceeding
    function validateStep() {
        if (currentStep === 1) {
            const fullName = document.getElementById('fullName').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            if (!fullName || !mobile) {
                alert('Please fill out all required fields (Full Name and Mobile Number).');
                return false;
            }
        }
        return true;
    }

    nextBtn.addEventListener('click', () => {
        if (validateStep() && currentStep < totalSteps) {
            currentStep++;
            updateFormSteps();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateFormSteps();
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateStep()) return;

        // Button Loading State
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
        `;
        submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

        // Mock API call delay
        setTimeout(() => {
            // Hide Survey Container
            surveyContainer.classList.add('opacity-0');
            
            setTimeout(() => {
                surveyContainer.classList.add('hidden');
                
                // Show Success Page
                successPage.classList.remove('hidden');
                void successPage.offsetWidth; // trigger reflow
                successPage.classList.remove('opacity-0');
                
                // Trigger the SVG stroke animation by adding a class if necessary
                // (Handled by CSS on display)
                
            }, 500);

        }, 1500);
    });

    // Initialize first step
    updateFormSteps();
});
