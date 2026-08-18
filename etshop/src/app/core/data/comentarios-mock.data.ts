import { Comentario } from '../models/dispositivo';

export const COMENTARIOS_MOCK: Comentario[] = [
  { id: 1, dispositivoId: 1, usuario: 'Carlos M.', calificacion: 5, texto: 'Excelente cámara, la batería dura todo el día sin problema.', fecha: '2025-11-10' },
  { id: 2, dispositivoId: 1, usuario: 'Laura P.', calificacion: 4, texto: 'Muy buen equipo, aunque el precio es alto para mi gusto.', fecha: '2025-11-08' },
  { id: 3, dispositivoId: 1, usuario: 'Andrés G.', calificacion: 5, texto: 'El mejor Samsung que he tenido, la pantalla se ve espectacular.', fecha: '2025-11-05' },

  { id: 4, dispositivoId: 2, usuario: 'Marcela R.', calificacion: 5, texto: 'La cámara y el rendimiento son insuperables, vale cada peso.', fecha: '2025-09-25' },
  { id: 5, dispositivoId: 2, usuario: 'Felipe T.', calificacion: 4, texto: 'Buen equipo pero el cargador se vende aparte, eso no me gustó.', fecha: '2025-09-22' },

  { id: 6, dispositivoId: 3, usuario: 'Diana V.', calificacion: 5, texto: 'Perfecto para trabajo, liviano y el teclado es muy cómodo.', fecha: '2025-06-20' },

  { id: 7, dispositivoId: 4, usuario: 'Santiago L.', calificacion: 5, texto: 'La batería dura literalmente todo el día, silencioso y rápido.', fecha: '2025-03-15' },
  { id: 8, dispositivoId: 4, usuario: 'Valentina S.', calificacion: 5, texto: 'Excelente para diseño y edición, muy recomendado.', fecha: '2025-03-12' },

  { id: 9, dispositivoId: 5, usuario: 'Jorge A.', calificacion: 4, texto: 'Muy buena relación precio-calidad, cumple bien para el día a día.', fecha: '2025-08-10' },

  { id: 10, dispositivoId: 6, usuario: 'Camilo R.', calificacion: 5, texto: 'Corre todo en ultra sin problema, pantalla a 240Hz se siente increíble.', fecha: '2025-10-18' },
  { id: 11, dispositivoId: 6, usuario: 'Natalia B.', calificacion: 4, texto: 'Muy potente pero se calienta un poco jugando varias horas seguidas.', fecha: '2025-10-15' },
];
