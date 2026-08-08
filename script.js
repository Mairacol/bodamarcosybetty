/* =========================================
   SCRIPT PRINCIPAL DE LA INVITACIÓN (BILINGÜE & PERSONALIZADO)
   ========================================= */

const SCRIPT_URL = "_GOOGLE_APPS_SCRIPT_URL_";

// Leer los parámetros de la URL (?family=...&slots=...&lang=en)
const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || 'es';
const family = urlParams.get('family') || (lang === 'en' ? 'Special Guest' : 'Invitado Especial');
const slots = parseInt(urlParams.get('slots')) || 1;
// Diccionario de textos ampliado para toda la web según el idioma
const translations = {
    es: {
        musicBtn: 'Música',
        heroSub: 'NOS CASAMOS',
        scroll: 'DESLIZAR',
        agendar: 'AGENDAR FECHA',
        venueDesc: 'Te esperamos para celebrar este momento único juntos.',
        verMapa: 'VER MAPA',
        cronogramaSub: 'EL GRAN DÍA',
        cronogramaTitle: 'Cronograma',
        ev1: 'Recepción',
        ev2: 'Ceremonia',
        ev3: 'Cena & Fiesta',
        ev4: 'Cierre',
        dressSub: 'CÓDIGO DE VESTIMENTA',
        dressTitle: 'Dress Code',
        dressType: 'Elegante / Cocktail',
        mujeres: 'Mujeres',
        largo: 'Largo',
        corto: 'Corto',
        hombres: 'Hombres',
        corbata: 'Con Corbata',
        sinCorbata: 'Sin Corbata',
        partySub: 'LA FIESTA',
        spotifyDesc: '¿Qué tema no puede faltar en la fiesta? ¡Sumá tus canciones favoritas a nuestra playlist colaborativa!',
        spotifyBtn: 'SUGERIR CANCIÓN',
        giftsSub: 'DETALLES',
        giftsTitle: 'Regalos',
        giftsDesc: 'Lo más importante es compartir este día con ustedes. Si desean tener un gesto con nosotros para nuestra nueva etapa, pueden hacerlo aquí:',
        btnNac: 'VER DATOS BANCARIOS (ARGENTINA)',
        titularNac: 'Titular:',
        btnInt: 'VER DATOS BANCARIOS (INTERNACIONAL)',
        bancoInt: 'Banco:',
        guestLabel: 'Invitados',
        passesAvailable: (n) => n === 1 ? '1 pase disponible' : `${n} pases disponibles`,
        asistenciaSub: 'ASISTENCIA',
        asistenciaTitle: 'RSVP',
        limit: 'Confirmar antes del 24 de Septiembre 2026',
        guestTitle: (i) => `Invitado ${i}`,
        nombrePlaceholder: 'Nombre *',
        apellidoPlaceholder: 'Apellido *',
        asistesLabel: '¿Asistes?',
        asisteSi: 'Sí, ahí estaré',
        asisteNo: 'No podré',
        transporteLabel: '¿Necesitás transporte desde CABA?',
        transporteSi: 'Sí',
        transporteNo: 'No',
        menuLabel: 'Preferencia de menú',
        menuOpciones: `
            <option value="Menú estándar" selected>Menú estándar</option>
            <option value="Celíaco / Sin TACC">Celíaco / Sin TACC</option>
            <option value="Vegetariano">Vegetariano</option>
            <option value="Vegano">Vegano</option>
        `,
        mensajePlaceholder: 'Mensaje para los novios (opcional)',
        submitBtn: 'ENVIAR CONFIRMACIÓN',
        errorMsg: 'Por favor completá todos los campos obligatorios.',
        successTitle: '¡Asistencia Confirmada!',
        successText: 'Tu respuesta fue guardada con éxito. ¡Te esperamos!',
        photoSub: 'RECUERDOS',
        photoTitle: 'Subir fotos de la boda',
        photoDesc: 'Queremos revivir nuestro día a través de sus ojos. Compartinos las fotos y videos que saquen durante la celebración.',
        photoBtn: 'SUBIR FOTOS',
        footerCredito: 'Una experiencia creada por'
    },
    en: {
        musicBtn: 'Music ON',
        heroSub: 'WE ARE GETTING MARRIED',
        scroll: 'SCROLL',
        agendar: 'ADD TO CALENDAR',
        venueDesc: 'We look forward to celebrating this unique moment together.',
        verMapa: 'VIEW MAP',
        cronogramaSub: 'THE BIG DAY',
        cronogramaTitle: 'Timeline',
        ev1: 'Reception',
        ev2: 'Ceremony',
        ev3: 'Dinner & Party',
        ev4: 'Closing',
        dressSub: 'DRESS CODE',
        dressTitle: 'Dress Code',
        dressType: 'Formal / Cocktail',
        mujeres: 'Women',
        largo: 'Long',
        corto: 'Short',
        hombres: 'Men',
        corbata: 'With Tie',
        sinCorbata: 'Without Tie',
        partySub: 'THE PARTY',
        spotifyDesc: "What songs should we add to our wedding playlist? Add your favorites to our collaborative playlist!",
        spotifyBtn: 'SUGGEST SONG',
        giftsSub: 'DETAILS',
        giftsTitle: 'Gifts',
        giftsDesc: 'What matters most to us is celebrating this day with you.\nIf you\'d like to help us begin this new chapter with a gift, you can do so here:',
        btnNac: 'VIEW BANK DETAILS (ARGENTINA)',
        titularNac: 'Account Holder:',
        btnInt: 'VIEW BANK DETAILS (INTERNATIONAL)',
        bancoInt: 'Bank:',
        guestLabel: 'Guests',
        passesAvailable: (n) => n === 1 ? '1 pass available' : `${n} passes available`,
        asistenciaSub: 'ATTENDANCE',
        asistenciaTitle: 'RSVP',
        limit: 'Please RSVP by September 15, 2026',
        guestTitle: (i) => `Guest ${i}`,
        nombrePlaceholder: 'First Name *',
        apellidoPlaceholder: 'Last Name *',
        asistesLabel: 'Will you attend?',
        asisteSi: "Yes, I'll be there",
        asisteNo: "I can't make it",
        transporteLabel: 'Do you need transportation from CABA?',
        transporteSi: 'Yes',
        transporteNo: 'No',
        menuLabel: 'Meal Preference',
        menuOpciones: `
            <option value="Standard Menu" selected>Standard Menu</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
        `,
        mensajePlaceholder: 'Message for the couple (optional)',
        submitBtn: 'SUBMIT RSVP',
        errorMsg: 'Please complete all required fields.',
        successTitle: 'Attendance Confirmed!',
        successText: 'Your response has been saved successfully. We look forward to seeing you!',
        photoSub: 'MEMORIES',
        photoTitle: 'Upload Wedding Photos',
        photoDesc: 'We want to relive our day through your eyes. Please share the photos and videos you take during the celebration.',
        photoBtn: 'UPLOAD PHOTOS',
        footerCredito: 'An experience created by'
    }
};

// Seleccionar el idioma actual
const t = translations[lang] || translations.es;

// Elementos del DOM
const familyNameEl = document.getElementById('familyName');
const slotsEl = document.getElementById('slots');
const guestsDiv = document.getElementById('guests');
const submitBtn = document.getElementById('submitBtn');
const validationCodeInput = document.getElementById('validationCode');
const introOverlay = document.getElementById('intro-overlay');
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const thanksModal = document.getElementById('thanksModal');
document.getElementById('footer-credito').textContent = t.footerCredito;
let isPlaying = false;

// Inyectar traducciones globales en toda la web al cargar
document.addEventListener('DOMContentLoaded', () => {
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('musicText', t.musicBtn);
    setText('txtHeroSub', t.heroSub);
    setText('txtScroll', t.scroll);
    setText('txtAgendar', t.agendar);
    setText('txtVenueDesc', t.venueDesc);
    setText('txtVerMapa', t.verMapa);
    setText('txtCronogramaSub', t.cronogramaSub);
    setText('txtCronogramaTitle', t.cronogramaTitle);
    setText('txtEv1', t.ev1);
    setText('txtEv2', t.ev2);
    setText('txtEv3', t.ev3);
    setText('txtEv4', t.ev4);
    setText('txtDressSub', t.dressSub);
    setText('txtDressTitle', t.dressTitle);
    setText('txtDressType', t.dressType);
    setText('txtMujeres', t.mujeres);
    setText('txtLargo', t.largo);
    setText('txtCorto', t.corto);
    setText('txtHombres', t.hombres);
    setText('txtCorbata', t.corbata);
    setText('txtSinCorbata', t.sinCorbata);
    setText('txtPartySub', t.partySub);
    setText('txtSpotifyDesc', t.spotifyDesc);
    setText('txtSpotifyBtn', t.spotifyBtn);
    setText('txtGiftsSub', t.giftsSub);
    setText('txtGiftsTitle', t.giftsTitle);
    setText('txtGiftsDesc', t.giftsDesc);
    setText('txtBtnNac', t.btnNac);
    setText('txtTitularNac', t.titularNac);
    setText('txtBtnInt', t.btnInt);
    setText('txtBancoInt', t.bancoInt);
    setText('txtGuestLabel', t.guestLabel);
    setText('txtRsvpSub', t.asistenciaSub);
    setText('txtRsvpLimit', t.limit);
    setText('txtPhotoSub', t.photoSub);
    setText('txtPhotoTitle', t.photoTitle);
    setText('txtPhotoDesc', t.photoDesc);

    const photoBtn = document.getElementById('txtPhotoBtn');
    if (photoBtn) {
        photoBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> ${t.photoBtn}`;
    }

    if (familyNameEl) familyNameEl.textContent = family;
    if (slotsEl) slotsEl.textContent = t.passesAvailable(slots);

    document.querySelectorAll('.rsvp-subtitle').forEach(el => el.textContent = t.asistenciaSub);
    document.querySelectorAll('.title-script').forEach(el => {
        if (!el.classList.contains('photo-title') && el.id !== 'txtCronogramaTitle' && el.id !== 'txtDressTitle' && el.id !== 'txtGiftsTitle') {
            el.textContent = t.asistenciaTitle;
        }
    });
    document.querySelectorAll('.limit').forEach(el => el.textContent = t.limit);
    if (submitBtn) submitBtn.textContent = t.submitBtn;

    if (slots && slots > 0) {
        generarCamposInvitados(slots);
    }
});

// =========================================
// INTRODUCCIÓN AUTOMÁTICA & MÚSICA DE FONDO
// =========================================
setTimeout(() => {
    if (introOverlay) {
        introOverlay.classList.add('hidden');
        
        if (bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                if (musicToggleBtn) musicToggleBtn.classList.add('playing');
                if (musicIcon) musicIcon.className = "fa-solid fa-volume-high";
                if (musicText) musicText.textContent = lang === 'en' ? "Music ON" : "Música ON";
            }).catch(e => {
                console.log("Audio autoplay restricted by browser:", e);
            });
        }
    }
}, 6000); 

if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicToggleBtn.classList.remove('playing');
            musicIcon.className = "fa-solid fa-volume-xmark";
            musicText.textContent = lang === 'en' ? "Paused" : "Pausado";
        } else {
            bgMusic.play();
            isPlaying = true;
            musicToggleBtn.classList.add('playing');
            musicIcon.className = "fa-solid fa-volume-high";
            musicText.textContent = lang === 'en' ? "Music ON" : "Música ON";
        }
    });
}

// =========================================
// 2. GENERAR CAMPOS DE INVITADOS AUTOMÁTICAMENTE
// =========================================
function generarCamposInvitados(cantidad) {
    if (!guestsDiv) return;
    guestsDiv.innerHTML = ''; 

    for (let i = 1; i <= cantidad; i++) {
        const div = document.createElement('div');
        div.classList.add('guest-editorial-card'); 

        div.innerHTML = `
            <div class="guest-card-top">
                <span class="guest-number">${t.guestTitle(i)}</span>
            </div>
            
            <div class="input-row-grid">
                <input type="text" placeholder="${t.nombrePlaceholder}" class="editorial-input nombre" required>
                <input type="text" placeholder="${t.apellidoPlaceholder}" class="editorial-input apellido" required>
            </div>

            <div class="field-block">
                <label class="editorial-label">${t.asistesLabel}</label>
                <div class="editorial-radio-group">
                    <label class="radio-pill"><input type="radio" name="asiste${i}" value="${lang === 'en' ? 'Yes' : 'Sí'}" required> ${t.asisteSi}</label>
                    <label class="radio-pill"><input type="radio" name="asiste${i}" value="${lang === 'en' ? 'No' : 'No'}"> ${t.asisteNo}</label>
                </div>
            </div>

            <div class="field-block">
                <label class="editorial-label">${t.transporteLabel}</label>
                <div class="editorial-radio-group">
                    <label class="radio-pill"><input type="radio" name="transporte${i}" value="${lang === 'en' ? 'Yes' : 'Sí'}" required> ${t.transporteSi}</label>
                    <label class="radio-pill"><input type="radio" name="transporte${i}" value="${lang === 'en' ? 'No' : 'No'}"> ${t.transporteNo}</label>
                </div>
            </div>

            <div class="field-block">
                <label class="editorial-label">${t.menuLabel}</label>
                <select class="editorial-select comida" required>
                    ${t.menuOpciones}
                </select>
            </div>

            <div class="field-block">
                <textarea placeholder="${t.mensajePlaceholder}" class="editorial-textarea mensaje" rows="2"></textarea>
            </div>
        `;
        guestsDiv.appendChild(div);
    }
}

// =========================================
// 3. SECCIÓN REGALOS (ACORDEÓN SUTIL)
// =========================================
function toggleGiftDetails(type) {
    const el = document.getElementById(`gift-${type}`);
    if (el) {
        el.classList.toggle('hidden');
    }
}

// =========================================
// 4. VALIDACIÓN & SUBMIT
// =========================================
function validarFormulario() {
  let valido = true;
  let primerError = null;

  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));

  const bloquesInvitados = document.querySelectorAll('.guest-editorial-card');
  if (bloquesInvitados.length === 0) return false;

  for (let i = 0; i < bloquesInvitados.length; i++) {
    const g = bloquesInvitados[i];
    const nombre = g.querySelector('.nombre');
    const apellido = g.querySelector('.apellido');
    const asistenteChecked = g.querySelector(`input[name="asiste${i + 1}"]:checked`);

    if (nombre && !nombre.value.trim()) {
      nombre.classList.add('field-error');
      valido = false;
      if (!primerError) primerError = nombre;
    }

    if (apellido && !apellido.value.trim()) {
      apellido.classList.add('field-error');
      valido = false;
      if (!primerError) primerError = apellido;
    }

    if (!asistenteChecked) {
      valido = false;
      const radioGroup = g.querySelector('.editorial-radio-group');
      if (radioGroup) {
        radioGroup.classList.add('field-error');
        if (!primerError) primerError = radioGroup;
      }
    }
  }

  if (!valido && primerError) {
    primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valido;
}

if (submitBtn) {
  submitBtn.addEventListener('click', async (e) => {
    if (e) e.preventDefault(); 

    const errorMsg = document.getElementById('formError');
    const esValido = validarFormulario();

    if (!esValido) {
      if (errorMsg) {
        errorMsg.classList.remove('hidden');
        errorMsg.style.display = 'block';
        errorMsg.textContent = t.errorMsg;
      }
      return; 
    }

    if (errorMsg) {
      errorMsg.classList.add('hidden');
      errorMsg.style.display = 'none';
    }

    const limpiarInterfazRsvp = () => {
      const rsvpInner = document.querySelector('.rsvp-inner');
      if (rsvpInner) {
        rsvpInner.innerHTML = `
          <div style="text-align: center; padding: 40px 20px;">
            <h3 style="font-family: var(--font-script); color: #000000; font-size: 2.8rem; margin-bottom: 10px;">
              ${t.successTitle}
            </h3>
            <p style="color: #555; font-size: 0.85rem; font-family: var(--font-heading); letter-spacing: 1px;">${t.successText}</p>
          </div>
        `;
      }
    };

    const honeypotValue = validationCodeInput ? validationCodeInput.value : '';
    if (honeypotValue.trim() !== '') {
      limpiarInterfazRsvp();
      openThanksModal();
      return; 
    }

    submitBtn.disabled = true;
    submitBtn.textContent = lang === 'en' ? 'SENDING...' : 'ENVIANDO...';

    const guests = [];
    document.querySelectorAll('.guest-editorial-card').forEach((g, i) => {
      guests.push({
        nombre: g.querySelector('.nombre').value.trim(),
        apellido: g.querySelector('.apellido').value.trim(),
        asiste: g.querySelector(`input[name="asiste${i+1}"]:checked`)?.value || '',
        transporte: g.querySelector(`input[name="transporte${i+1}"]:checked`)?.value || 'No',
        comida: g.querySelector('.comida').value,
        mensaje: g.querySelector('.mensaje').value.trim()
      });
    });

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ familia: family, guests: guests })
      });

      limpiarInterfazRsvp();
      openThanksModal();

    } catch (error) {
      console.error(error);
      alert(lang === 'en' ? 'Network error. Please try again.' : 'Hubo un error de red. Por favor, intentalo de nuevo.');
      submitBtn.disabled = false;
      submitBtn.textContent = t.submitBtn;
    }
  });
}

function openThanksModal() {
    if (thanksModal) thanksModal.classList.remove('hidden');
}

function closeThanksModal() {
    if (thanksModal) {
        thanksModal.classList.add('hidden');
    }
}