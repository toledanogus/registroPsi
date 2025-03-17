import SQLite from 'react-native-sqlite-storage';

// Abre la base de datos (o créala si no existe)
const db = SQLite.openDatabase(
  { name: 'registropsi.db', location: 'default' },
  () => console.log('Base de datos abierta con éxito'),
  error => console.error('Error al abrir la base de datos', error)
);


// export const createTableRegistros = () => {
//     SQLite.deleteDatabase(
//       { name: 'registropsi.db', location: 'default' },
//       () => {
//         console.log('Base de datos eliminada con éxito');
//       },
//       error => {
//         console.error('Error al eliminar la base de datos', error);
//       }
//     );
//   };
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS botones (id INTEGER PRIMARY KEY DEFAULT 1, cantidadBotones INTEGER, nombreBotones TEXT);',
      [],
      () => console.log('Tabla ButtonNames creada o verificada'),
      error => console.error('Error al crear la tabla ButtonNames', error)
    );
  });
};

export const createTableRegistros = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS registros (id INTEGER PRIMARY KEY AUTOINCREMENT, dayOfWeek TEXT, time TEXT, categoria TEXT);',
      [],
      () => {
        console.log('Tabla creada con éxito');
      },
      error => {
        console.error('Error al crear la tabla', error);
      }
    );
  });
};

export const registrar = (dayOfWeek, time, categoria) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO registros (dayOfWeek, time, categoria) VALUES (?, ?, ?);',
      [dayOfWeek, time, categoria],
      () => {
        console.log('Registro insertado con éxito');
      },
      error => {
        console.error('Error al insertar el registro', error);
      }
    );
  });
};

export const registrarBotones = (numeroBotones, nombresBotones) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO botones (id, cantidadBotones, nombreBotones) VALUES (1, ?, ?);',
        [numeroBotones, nombresBotones],
        () => console.log('Registro insertado o actualizado con éxito'),
        error => console.error('Error al insertar o actualizar el registro', error)
      );
    });
  };

export const getBotones = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM botones;',
      [],
      (_, results) => {
        const rows = results.rows.raw(); // Obtiene los datos en formato de array
        callback(rows);
      },
      error => console.error('Error al obtener los registros', error)
    );
  });
};

export const getRegistros = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM registros;',
      [],
      (_, result) => {
        callback(result.rows.raw());
      },
      error => {
        console.error('Error al obtener los registros', error);
      }
    );
  });
};