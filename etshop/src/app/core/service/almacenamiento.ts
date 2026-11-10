import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

/**
 * Envoltorio sobre Capacitor Preferences.
 * En Android/iOS usa el almacenamiento nativo; en el navegador, localStorage.
 */
@Injectable({ providedIn: 'root' })
export class AlmacenamientoService {

  async guardar<T>(clave: string, valor: T): Promise<void> {
    try {
      await Preferences.set({ key: clave, value: JSON.stringify(valor) });
    } catch (e) {
      console.error(`No se pudo guardar "${clave}"`, e);
    }
  }

  async leer<T>(clave: string): Promise<T | null> {
    try {
      const { value } = await Preferences.get({ key: clave });
      return value ? (JSON.parse(value) as T) : null;
    } catch (e) {
      console.error(`No se pudo leer "${clave}"`, e);
      return null;
    }
  }

  async borrar(clave: string): Promise<void> {
    try {
      await Preferences.remove({ key: clave });
    } catch (e) {
      console.error(`No se pudo borrar "${clave}"`, e);
    }
  }
}
