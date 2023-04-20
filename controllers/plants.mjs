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

export async function create_plant(plantId, plantName, status) {

    const session = await mysqlx.getSession(config);
    console.log("plant id: " + plantId);
    console.log("plant name: " + plantName);
    console.log("status: " + status);
    await session.sql('CALL create_plant(?,?,?);').bind(plantId, plantName, status).execute();
    session.close();

}

export async function update_status(plantId, status) {

    const session = await mysqlx.getSession(config);
    console.log("plant id: " + plantId);
    await session.sql('CALL update_status(?,?);').bind(plantId, status).execute();
    session.close();

}

export async function get_note(plantId) {

    const session = await mysqlx.getSession(config);
    console.log("plant id: " + plantId);
    await session.sql('CALL get_note(?);').bind(plantId).execute();
    session.close();

}

export async function add_note(plantId, note) {

    const session = await mysqlx.getSession(config);
    console.log("plant id: " + plantId);
    console.log("note: " + note);
    await session.sql('CALL add_note(?,?);').bind(plantId, note).execute();
    session.close();

}

export async function update_plant(plantId) {

    const session = await mysqlx.getSession(config);
    console.log("plant to water: " + plantId);
    // console.log("date: " + plantName);
    await session.sql('CALL water_plant(?);').bind(plantId).execute();
    session.close();

}


export async function delete_plant(plantId) {

    const session = await mysqlx.getSession(config);
    await session.sql('CALL delete_plant(?);').bind(plantId).execute();
    session.close();

}



