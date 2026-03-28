import{$ as e,t}from"./sweetalert2.all-CK1MqtaF.js";var n=e(t(),1),r=e=>{let t=localStorage.getItem(`userName`)||`Buscador de la Verdad`;n.default.fire({title:`Editar Usuario`,html:`
      <div style="text-align: left; margin-top: 1rem; width: 100%;">
        <label style="color: #dbc065; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 0.5rem; font-weight: 600;">Nombre Cósmico</label>
        <input id="swal-input-name" class="swal2-input" value="${t}" readonly style="background: rgba(15, 16, 22, 0.5); color: #8a8d9b; border: 1px solid rgba(255,255,255,0.05); margin: 0; width: 100%; font-size: 0.9rem; padding: 0.8rem; cursor: not-allowed; box-sizing: border-box;">
        
        <label style="color: #dbc065; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; display: block; margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600;">Nueva Contraseña</label>
        <div style="position: relative; width: 100%;">
          <input id="swal-input-password" type="password" class="swal2-input" placeholder="Ingresa para cambiar (opcional)" style="background: #0f1016; color: white; border: 1px solid rgba(255,255,255,0.1); margin: 0; width: 100%; font-size: 0.9rem; padding: 0.8rem; padding-right: 2.5rem; box-sizing: border-box;">
          
          <button type="button" onclick="
            const input = document.getElementById('swal-input-password');
            const eyeOn = document.getElementById('eye-on');
            const eyeOff = document.getElementById('eye-off');
            if (input.type === 'password') {
              input.type = 'text';
              eyeOn.style.display = 'none';
              eyeOff.style.display = 'block';
            } else {
              input.type = 'password';
              eyeOn.style.display = 'block';
              eyeOff.style.display = 'none';
            }
          " style="position: absolute; right: 0.8rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #8a8d9b; padding: 0; display: flex; align-items: center; justify-content: center;">
            <svg id="eye-on" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block;">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg id="eye-off" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>
    `,background:`#15161d`,color:`#ffffff`,showCancelButton:!0,showDenyButton:!0,confirmButtonColor:`#dbc065`,denyButtonColor:`#1a1b24`,cancelButtonColor:`transparent`,confirmButtonText:`Guardar`,denyButtonText:`Cerrar Sesión`,cancelButtonText:`Cancelar`,customClass:{popup:`cosmic-swal`,denyButton:`logout-btn`},preConfirm:()=>({pass:document.getElementById(`swal-input-password`).value})}).then(t=>{t.isConfirmed?n.default.fire({title:`Actualizado`,text:`Tu perfil ha sido modificado exitosamente.`,icon:`success`,background:`#15161d`,color:`#ffffff`,confirmButtonColor:`#dbc065`}).then(()=>{window.location.reload()}):t.isDenied&&(localStorage.removeItem(`userName`),n.default.fire({title:`Sesión Cerrada`,text:`Tu portal ha sido cerrado. Que las estrellas guíen tu camino.`,icon:`info`,background:`#15161d`,color:`#ffffff`,confirmButtonColor:`#dbc065`}).then(()=>{e.push(`/`)}))})};export{r as t};