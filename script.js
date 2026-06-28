// Custom logic for the SFADC Alumni Survey form

/* ── ✅ YOUR CREDENTIALS — fill these in before going live ── */
const CLOUDINARY_CLOUD_NAME = 'da6fjyirm';
const CLOUDINARY_UPLOAD_PRESET = 'ifadaData';

const SUPABASE_URL = 'https://qqruwdwssaezwzugdsfr.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'sb_publishable_CzQ_xwzXKrN0w0lMbsKDvA_iDjr5QNo';
/* ─────────────────────────────────────────────────────────── */

// Normalize: strip trailing /rest/v1/ so we can always append it ourselves
const SB_BASE = SUPABASE_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const SB_ENDPOINT = `${SB_BASE}/rest/v1`;
const SB_HEADERS = {
    'Content-Type':  'application/json',
    'apikey':        SUPABASE_ANON_KEY,
};


/* ── Country Code Picker ── */
const COUNTRIES = [
    { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
    { name: 'Albania', code: '+355', flag: '🇦🇱' },
    { name: 'Algeria', code: '+213', flag: '🇩🇿' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Austria', code: '+43', flag: '🇦🇹' },
    { name: 'Bahrain', code: '+973', flag: '🇧🇭' },
    { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'China', code: '+86', flag: '🇨🇳' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'Ethiopia', code: '+251', flag: '🇪🇹' },
    { name: 'Finland', code: '+358', flag: '🇫🇮' },
    { name: 'France', code: '+33', flag: '🇫🇷' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
    { name: 'Ghana', code: '+233', flag: '🇬🇭' },
    { name: 'Greece', code: '+30', flag: '🇬🇷' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
    { name: 'Iran', code: '+98', flag: '🇮🇷' },
    { name: 'Iraq', code: '+964', flag: '🇮🇶' },
    { name: 'Ireland', code: '+353', flag: '🇮🇪' },
    { name: 'Israel', code: '+972', flag: '🇮🇱' },
    { name: 'Italy', code: '+39', flag: '🇮🇹' },
    { name: 'Japan', code: '+81', flag: '🇯🇵' },
    { name: 'Jordan', code: '+962', flag: '🇯🇴' },
    { name: 'Kenya', code: '+254', flag: '🇰🇪' },
    { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
    { name: 'Lebanon', code: '+961', flag: '🇱🇧' },
    { name: 'Libya', code: '+218', flag: '🇱🇾' },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
    { name: 'Maldives', code: '+960', flag: '🇲🇻' },
    { name: 'Mauritius', code: '+230', flag: '🇲🇺' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽' },
    { name: 'Morocco', code: '+212', flag: '🇲🇦' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
    { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
    { name: 'Norway', code: '+47', flag: '🇳🇴' },
    { name: 'Oman', code: '+968', flag: '🇴🇲' },
    { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
    { name: 'Palestine', code: '+970', flag: '🇵🇸' },
    { name: 'Philippines', code: '+63', flag: '🇵🇭' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Qatar', code: '+974', flag: '🇶🇦' },
    { name: 'Russia', code: '+7', flag: '🇷🇺' },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬' },
    { name: 'Somalia', code: '+252', flag: '🇸🇴' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦' },
    { name: 'South Korea', code: '+82', flag: '🇰🇷' },
    { name: 'Spain', code: '+34', flag: '🇪🇸' },
    { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
    { name: 'Sudan', code: '+249', flag: '🇸🇩' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
    { name: 'Syria', code: '+963', flag: '🇸🇾' },
    { name: 'Tanzania', code: '+255', flag: '🇹🇿' },
    { name: 'Thailand', code: '+66', flag: '🇹🇭' },
    { name: 'Tunisia', code: '+216', flag: '🇹🇳' },
    { name: 'Turkey', code: '+90', flag: '🇹🇷' },
    { name: 'Uganda', code: '+256', flag: '🇺🇬' },
    { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
    { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Yemen', code: '+967', flag: '🇾🇪' },
    { name: 'Zimbabwe', code: '+263', flag: '🇿🇼' },
];

function initCountryPicker() {
    const btn = document.getElementById('countryPickerBtn');
    const dropdown = document.getElementById('countryDropdown');
    const searchInput = document.getElementById('countrySearch');
    const list = document.getElementById('countryList');
    const selFlag = document.getElementById('selectedFlag');
    const selCode = document.getElementById('selectedCode');
    const hiddenCode = document.getElementById('mobileCountryCode');

    if (!btn) return; // element not in DOM yet

    let selected = COUNTRIES.find(c => c.code === '+91'); // default India

    function renderList(filter = '') {
        const q = filter.toLowerCase();
        const filtered = COUNTRIES.filter(c =>
            c.name.toLowerCase().includes(q) || c.code.includes(q)
        );
        list.innerHTML = '';
        filtered.forEach(country => {
            const li = document.createElement('li');
            li.className = 'country-item' + (country === selected ? ' active' : '');
            li.setAttribute('role', 'option');
            li.innerHTML = `
                <span class="ci-flag">${country.flag}</span>
                <span class="ci-name">${country.name}</span>
                <span class="ci-code">${country.code}</span>
            `;
            li.addEventListener('click', () => {
                selected = country;
                selFlag.textContent = country.flag;
                selCode.textContent = country.code;
                hiddenCode.value = country.code;
                closeDropdown();
            });
            list.appendChild(li);
        });
        if (filtered.length === 0) {
            list.innerHTML = '<li style="padding:10px 14px;color:#94a3b8;font-size:0.8rem;">No results found</li>';
        }
    }

    function openDropdown() {
        dropdown.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        searchInput.value = '';
        renderList();
        searchInput.focus();
    }

    function closeDropdown() {
        dropdown.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.contains('hidden') ? openDropdown() : closeDropdown();
    });

    searchInput.addEventListener('input', () => renderList(searchInput.value));

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!document.getElementById('countryPicker').contains(e.target)) {
            closeDropdown();
        }
    });

    // Initial render
    renderList();
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Membership Card Integration State ---
    let membershipConfig = null;
    let membershipTemplateImg = null;
    let isMembershipVerified = false;

    // Load Firebase configuration for Membership Card
    let attempts = 0;
    const checkFirebase = async () => {
        attempts++;
        if (window.getGlobalSettings) {
            const result = await window.getGlobalSettings();
            if (result.success) {
                membershipConfig = result.data.config;
                const imgSrc = result.data.templateUrl;
                
                // Preload template image
                membershipTemplateImg = new Image();
                membershipTemplateImg.crossOrigin = "Anonymous";
                membershipTemplateImg.src = imgSrc;
                membershipTemplateImg.onload = () => {
                    console.log("Membership template loaded successfully.");
                };
                membershipTemplateImg.onerror = () => {
                    console.error("Failed to load membership template.");
                };
            } else {
                console.error("Firebase config error:", result.error);
            }
        } else {
            if (attempts < 20) setTimeout(checkFirebase, 500);
            else console.error("Firebase connection timeout.");
        }
    };
    checkFirebase();

    initCountryPicker();

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
    const imagePreview = document.getElementById('imagePreview');
    const uploadIcon = document.getElementById('uploadIcon');

    if (fileUploadContainer && photoInput) {
        // Trigger file input when container is clicked (bypass if clicked directly on input or label)
        fileUploadContainer.addEventListener('click', (e) => {
            if (e.target === photoInput || e.target.closest('label')) {
                return;
            }
            photoInput.click();
        });

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadContainer.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        // Highlight container on drag over/enter
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadContainer.addEventListener(eventName, () => {
                fileUploadContainer.classList.add('border-brand-500', 'bg-brand-50');
                fileUploadContainer.classList.remove('border-slate-300', 'bg-white/50');
            }, false);
        });

        // Unhighlight on drag leave/drop
        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadContainer.addEventListener(eventName, () => {
                if (!photoInput.files || photoInput.files.length === 0) {
                    fileUploadContainer.classList.remove('border-brand-500', 'bg-brand-50');
                    fileUploadContainer.classList.add('border-slate-300', 'bg-white/50');
                }
            }, false);
        });

        // Handle dropped files
        fileUploadContainer.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files && files.length > 0) {
                photoInput.files = files;
                // Dispatch change event to trigger preview and validation
                photoInput.dispatchEvent(new Event('change'));
            }
        }, false);
    }

    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            // Revoke previous object URL if it exists
            if (imagePreview && imagePreview.src && imagePreview.src.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview.src);
            }

            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2); // in MB

                // 1. File type validation
                if (!file.type.startsWith('image/')) {
                    alert('Invalid file format. Please select an image file (PNG, JPG, or GIF).');
                    photoInput.value = ''; // Reset input
                    resetFileDisplay();
                    return;
                }

                // 2. File size validation (10MB limit)
                if (file.size > 10 * 1024 * 1024) {
                    alert('File size exceeds the 10MB limit. Please select a smaller file.');
                    photoInput.value = ''; // Reset input
                    resetFileDisplay();
                    return;
                }

                // Update text and container styles
                fileNameDisplay.innerHTML = `<span class="text-brand-600 font-medium">${fileName}</span> (${fileSize} MB)`;
                fileUploadContainer.classList.add('border-brand-500', 'bg-brand-50');
                fileUploadContainer.classList.remove('border-slate-300', 'bg-white/50');

                // Update image preview
                if (imagePreview && uploadIcon) {
                    imagePreview.src = URL.createObjectURL(file);
                    imagePreview.classList.remove('hidden');
                    uploadIcon.classList.add('hidden');
                }
            } else {
                resetFileDisplay();
            }
        });
    }

    function resetFileDisplay() {
        if (fileNameDisplay) fileNameDisplay.textContent = 'PNG, JPG, GIF up to 10MB';
        if (fileUploadContainer) {
            fileUploadContainer.classList.remove('border-brand-500', 'bg-brand-50');
            fileUploadContainer.classList.add('border-slate-300', 'bg-white/50');
        }
        if (imagePreview && uploadIcon) {
            imagePreview.classList.add('hidden');
            imagePreview.src = '';
            uploadIcon.classList.remove('hidden');
        }
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

    // --- Membership Radio Change Listeners ---
    const membershipRadios = document.querySelectorAll('input[name="membership"]');
    const membershipPanel = document.getElementById('membershipDetailsPanel');
    const screenshotInput = document.getElementById('membershipScreenshot');
    const statusText = document.getElementById('membershipStatusText');

    membershipRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'Pay now') {
                membershipPanel.classList.remove('hidden');
            } else {
                membershipPanel.classList.add('hidden');
            }
        });
    });

    // --- Tesseract OCR Scanning ---
    if (screenshotInput) {
        screenshotInput.addEventListener('change', () => {
            const file = screenshotInput.files[0];
            if (!file) return;

            statusText.innerHTML = '<span class="text-amber-600 flex items-center gap-1.5"><svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Scanning screenshot...</span>';
            isMembershipVerified = false;

            if (typeof Tesseract === 'undefined') {
                statusText.innerHTML = '<span class="text-red-500 font-medium">Scanner library missing. Please check internet connection.</span>';
                return;
            }

            Tesseract.recognize(file, 'eng')
                .then(({ data: { text } }) => {
                    console.log("Membership Scan Result:", text);
                    const matches = text.replace(/[\n\r]+/g, ' ').match(/[\d,]+\.?\d*/g);
                    let hasValidAmount = false;
                    
                    if (matches) {
                        hasValidAmount = matches.some(m => {
                            const clean = m.replace(/,/g, '');
                            const num = parseFloat(clean);
                            return !isNaN(num) && num >= 500;
                        });
                    }

                    if (hasValidAmount || text.includes('500')) {
                        isMembershipVerified = true;
                        statusText.innerHTML = '<span class="text-emerald-600 font-bold flex items-center gap-1">✓ Verified (₹500+ found)</span>';
                    } else {
                        statusText.innerHTML = '<span class="text-red-500 font-semibold">Could not read "500". Please upload a clearer screenshot.</span>';
                    }
                })
                .catch(err => {
                    console.error("Scanner Error:", err);
                    statusText.innerHTML = '<span class="text-red-500 font-semibold">Scanner error. Please try again.</span>';
                });
        });
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
        if (currentStep === 6) {
            const selectedMembership = document.querySelector('input[name="membership"]:checked')?.value;
            if (selectedMembership === 'Pay now') {
                const batch = document.getElementById('membershipBatch').value;
                if (!batch) {
                    alert('Please select your Batch for the membership card.');
                    return false;
                }
                const screenshotFile = screenshotInput ? screenshotInput.files[0] : null;
                if (!screenshotFile) {
                    alert('Please upload your payment screenshot.');
                    return false;
                }
                if (!isMembershipVerified) {
                    alert('Payment screenshot has not been successfully verified yet. Please ensure ₹500 or more is visible.');
                    return false;
                }
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

    // ── Handle Form Submission ──────────────────────────────────────────
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        // --- Button: Loading state ---
        const originalBtnHtml = submitBtn.innerHTML;
        const setLoading = (msg) => {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ${msg}
            `;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
        };
        const resetBtn = () => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
        };

        const generateAndSaveMembershipCard = async () => {
            if (!membershipConfig || !membershipTemplateImg) {
                throw new Error("Membership configuration or template image is not loaded yet. Please wait or refresh.");
            }

            const fullName = document.getElementById('fullName').value.trim();
            const mobile = document.getElementById('mobile').value.trim();
            const batch = document.getElementById('membershipBatch').value;

            // 1. Upload Payment Screenshot to Cloudinary
            setLoading('Uploading proof…');
            const proofFile = screenshotInput.files[0];
            const formData = new FormData();
            formData.append('file', proofFile);
            formData.append('upload_preset', 'ifada-sanad');

            const proofRes = await fetch(
                `https://api.cloudinary.com/v1_1/da6fjyirm/image/upload`,
                { method: 'POST', body: formData }
            );
            if (!proofRes.ok) {
                throw new Error("Failed to upload payment screenshot.");
            }
            const proofData = await proofRes.json();
            const paymentProofUrl = proofData.secure_url;

            // 2. Draw the membership card
            setLoading('Drawing card…');
            const canvas = document.getElementById('card-canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = membershipTemplateImg.width;
            canvas.height = membershipTemplateImg.height;
            ctx.drawImage(membershipTemplateImg, 0, 0);

            const scaleFactor = canvas.width / 1000;
            const nameWeight = membershipConfig.name.weight || '700';
            const batchWeight = membershipConfig.batch.weight || '400';
            const fontName = `${nameWeight} ${membershipConfig.name.size * scaleFactor * 1.5}px 'Clash Grotesk'`;
            const fontBatch = `${batchWeight} ${membershipConfig.batch.size * scaleFactor * 1.5}px 'Clash Grotesk'`;

            try {
                const fontLoadPromise = Promise.all([
                    document.fonts.load(fontName),
                    document.fonts.load(fontBatch)
                ]);
                await Promise.race([fontLoadPromise, new Promise(r => setTimeout(r, 1000))]);
            } catch (e) {
                console.error("Font loading error:", e);
            }

            const drawTxt = (txt, conf, font) => {
                const x = (conf.x / 100) * canvas.width;
                const y = (conf.y / 100) * canvas.height;
                ctx.font = font;
                ctx.fillStyle = conf.color || '#FFF';
                ctx.textAlign = 'center';
                ctx.fillText(txt, x, y);
            };

            drawTxt(fullName.toUpperCase(), membershipConfig.name, fontName);
            drawTxt(batch, membershipConfig.batch, fontBatch);

            // QR Code
            if (mobile) {
                try {
                    const qrConf = membershipConfig.qrcode || { x: 50, y: 85, size: 15 };
                    const size = (qrConf.size / 100) * canvas.width;
                    const x = (qrConf.x / 100) * canvas.width - (size / 2);
                    const y = (qrConf.y / 100) * canvas.height - (size / 2);

                    const tmp = document.createElement('canvas');
                    await QRCode.toCanvas(tmp, mobile, { width: 500, margin: 1 });
                    ctx.drawImage(tmp, x, y, size, size);
                } catch (e) {
                    console.error("QR Code generation error:", e);
                }
            }

            // 3. Upload Generated Card to Cloudinary
            setLoading('Saving card…');
            const cardBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const cardFormData = new FormData();
            cardFormData.append('file', cardBlob);
            cardFormData.append('upload_preset', 'ifada-sanad');

            const cardRes = await fetch(
                `https://api.cloudinary.com/v1_1/da6fjyirm/image/upload`,
                { method: 'POST', body: cardFormData }
            );
            if (!cardRes.ok) {
                throw new Error("Failed to upload generated membership card.");
            }
            const cardData = await cardRes.json();
            const cardImageUrl = cardData.secure_url;

            // 4. Save to Firebase
            const saveRes = await window.saveCardToDB({
                name: fullName,
                batch: batch,
                mobile: mobile,
                paymentProofUrl: paymentProofUrl,
                imageUrl: cardImageUrl
            });

            if (!saveRes.success) {
                throw new Error("Failed to save membership card to database: " + saveRes.error);
            }

            return cardImageUrl;
        };

        try {
            // ── STEP 0: Check duplicate mobile number ─────────────────────
            setLoading('Checking…');
            const mobileVal = document.getElementById('mobile').value.trim();

            const dupRes = await fetch(
                `${SB_ENDPOINT}/alumni_responses?mobile=eq.${encodeURIComponent(mobileVal)}&select=id&limit=1`,
                { headers: SB_HEADERS }
            );
            if (dupRes.ok) {
                const existing = await dupRes.json();
                if (existing.length > 0) {
                    resetBtn();
                    showFormError('⚠️ This mobile number has already been submitted. Each number can only submit once.');
                    return;
                }
            }

            // ── STEP 0.5: Generate and upload Membership Card if Pay Now is selected ──
            const selectedMembership = document.querySelector('input[name="membership"]:checked')?.value;
            if (selectedMembership === 'Pay now') {
                await generateAndSaveMembershipCard();
            }

            // ── STEP 1: Upload photo to Cloudinary ───────────────────────
            let photoUrl = null;
            const photoFile = document.getElementById('photo').files[0];

            if (photoFile) {
                setLoading('Uploading photo…');
                const formData = new FormData();
                formData.append('file', photoFile);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                const cloudRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: formData }
                );
                if (!cloudRes.ok) {
                    let errMsg = 'Cloudinary upload failed';
                    try {
                        const errJson = await cloudRes.json();
                        if (errJson.error && errJson.error.message) {
                            errMsg = `Cloudinary upload failed: ${errJson.error.message}`;
                        }
                    } catch (e) {
                        errMsg = `Cloudinary upload failed with status ${cloudRes.status}`;
                    }
                    throw new Error(errMsg);
                }
                const cloudData = await cloudRes.json();
                photoUrl = cloudData.secure_url;
            }

            // ── STEP 2: Collect all form data ────────────────────────────
            setLoading('Saving your response…');

            const skills = [...document.querySelectorAll('input[name="skills"]:checked')].map(el => el.value);
            const skillOther = document.getElementById('skillOtherText').value.trim();
            if (skillOther && document.getElementById('skillOtherCheck').checked) skills.push(skillOther);

            const engagement = [...document.querySelectorAll('input[name="engagement"]:checked')].map(el => el.value);

            const fieldOfWork = document.querySelector('input[name="fieldOfWork"]:checked')?.value || null;
            const fieldOthersVal = document.getElementById('fieldOthersText').value.trim();
            const finalField = (fieldOfWork === 'Others' && fieldOthersVal) ? `Others: ${fieldOthersVal}` : fieldOfWork;

            const payload = {
                full_name: document.getElementById('fullName').value.trim(),
                mobile: document.getElementById('mobile').value.trim(),
                country_code: document.getElementById('mobileCountryCode').value,
                email: document.getElementById('email').value.trim() || null,
                residence_place: document.getElementById('residencePlace').value.trim() || null,
                country: document.getElementById('country').value.trim() || null,
                dob: document.getElementById('dob').value || null,
                photo_url: photoUrl,
                admission_year: parseInt(document.getElementById('admissionYear').value) || null,
                leaving_year: parseInt(document.getElementById('leavingYear').value) || null,
                alumni_status: document.querySelector('input[name="alumniStatus"]:checked')?.value || null,
                qualification: document.getElementById('qualification').value.trim() || null,
                additional_degrees: document.getElementById('additionalDegrees').value.trim() || null,
                profession: document.getElementById('profession').value.trim() || null,
                organization: document.getElementById('organization').value.trim() || null,
                field_of_work: finalField,
                work_location: document.getElementById('workLocation').value.trim() || null,
                skills: skills.length ? skills : null,
                engagement: engagement.length ? engagement : null,
                directory_include: document.querySelector('input[name="directoryInclude"]:checked')?.value || null,
                whatsapp_join: document.querySelector('input[name="whatsappJoin"]:checked')?.value || null,
                region: document.querySelector('input[name="region"]:checked')?.value || null,
                coordinator: document.querySelector('input[name="coordinator"]:checked')?.value || null,
                remarks: document.getElementById('remarks').value.trim() || null,
            };

            // ── STEP 3: Insert into Supabase ─────────────────────────────
            const sbRes = await fetch(`${SB_ENDPOINT}/alumni_responses`, {
                method: 'POST',
                headers: { ...SB_HEADERS, 'Prefer': 'return=minimal' },
                body: JSON.stringify(payload),
            });

            if (!sbRes.ok) {
                const err = await sbRes.text();
                throw new Error(`Supabase error: ${err}`);
            }

            // ── STEP 4: Show success page ─────────────────────────────────
            surveyContainer.classList.add('opacity-0');
            setTimeout(async () => {
                surveyContainer.classList.add('hidden');
                
                // Show/hide download button depending on membership choice
                const selectedMembership = document.querySelector('input[name="membership"]:checked')?.value;
                const downloadCardContainer = document.getElementById('downloadCardBtnContainer');
                if (selectedMembership === 'Pay now' && downloadCardContainer) {
                    downloadCardContainer.classList.remove('hidden');
                } else if (downloadCardContainer) {
                    downloadCardContainer.classList.add('hidden');
                }

                // Fetch WhatsApp link if the user chose 'Yes' to join
                const whatsappJoinVal = document.querySelector('input[name="whatsappJoin"]:checked')?.value;
                if (whatsappJoinVal === 'Yes' || whatsappJoinVal === 'No') {
                    try {
                        const waRes = await fetch(`${SB_ENDPOINT}/settings?key=eq.whatsapp_link&select=value`, { headers: SB_HEADERS });
                        if (waRes.ok) {
                            const waData = await waRes.json();
                            if (waData && waData.length > 0 && waData[0].value) {
                                const waBtn = document.getElementById('waSuccessBtn');
                                const waContainer = document.getElementById('waSuccessBtnContainer');
                                const waText = waContainer.querySelector('p');
                                                
                                if (whatsappJoinVal === 'No' && waText) {
                                    waText.textContent = 'Even though you opted not to join the official WhatsApp group, you can still join using the button below if you change your mind:';
                                } else if (waText) {
                                    waText.textContent = 'Since you selected willingness to join the official WhatsApp group, click the button below to join:';
                                }
                                                
                                waBtn.href = waData[0].value;
                                waContainer.classList.remove('hidden');
                            }
                        }
                    } catch (e) {
                        console.error('Error loading WhatsApp link:', e);
                    }
                }

                successPage.classList.remove('hidden');
                void successPage.offsetWidth;
                successPage.classList.remove('opacity-0');
            }, 500);

        } catch (err) {
            console.error('Submission error:', err);
            showFormError(`Submission failed: ${err.message}`);
            resetBtn();
        }
    });

    // --- Membership Card Download Listener ---
    const downloadCardBtn = document.getElementById('downloadCardBtn');
    if (downloadCardBtn) {
        downloadCardBtn.addEventListener('click', () => {
            const canvas = document.getElementById('card-canvas');
            const link = document.createElement('a');
            link.download = `MembershipCard.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    // Initialize first step
    updateFormSteps();

    // ── Helper: show inline error banner above navigation ──────────────
    function showFormError(msg) {
        let banner = document.getElementById('formErrorBanner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'formErrorBanner';
            banner.style.cssText = `
                background:#fef2f2; border:1px solid #fca5a5; color:#b91c1c;
                border-radius:0.75rem; padding:0.85rem 1.1rem;
                font-size:0.875rem; font-weight:500; margin-bottom:1rem;
                display:flex; align-items:center; gap:0.5rem;
                animation: fadeIn 0.3s ease;
            `;
            const navDiv = document.querySelector('.mt-10.pt-6.border-t');
            if (navDiv) navDiv.parentNode.insertBefore(banner, navDiv);
        }
        banner.textContent = msg;
        banner.style.display = 'flex';
        // Auto-hide after 6 seconds
        setTimeout(() => { banner.style.display = 'none'; }, 6000);
    }
});
