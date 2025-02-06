export default async (req, context) => {
    return new Response(await (await fetch("https://blokadnedonacije.rs/")).text(), {
        status: 200,
    });
};
