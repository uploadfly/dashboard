import Plunk from "@plunk/node";

const plunk = new Plunk(process.env.PLUNK_API_KEY as string);

export default plunk;
