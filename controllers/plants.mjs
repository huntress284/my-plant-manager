import mysqlx from '@mysql/xdevapi';

const config = {
    user: process.env.MYSQLX_USER,
    password: process.env.MYSQLX_PASSWORD,
    host: process.env.MYSQLX_HOST,
    port: Number.parseInt(process.env.MYSQLX_PORT),
    schema: process.env.MYSQLX_SCHEMA
};

export async function list_plants() {
    let data;
    try {
        const session = await mysqlx.getSession(config);
        data = await session.sql(`CALL list_plants();`).execute();
        session.close();
        return data.fetchAll();
    } catch (error) {
        console.error(error);
    }
}

export async function create_plant(plantId, plantName) {

    const session = await mysqlx.getSession(config);
    console.log("plant id: " + plantId);
    console.log("plant name: " + plantName);
    await session.sql('CALL create_plant(?,?);').bind(plantId, plantName).execute();
    session.close();

}

export async function delete_plant(plantName) {

    const session = await mysqlx.getSession(config);
    await session.sql('CALL delete_plant(?,?);').bind(plantId, plantName).execute();
    session.close();

}


