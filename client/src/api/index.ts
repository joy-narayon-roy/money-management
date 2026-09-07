import { api } from "./api";
import auth from "./auth";
import createBulkTransaction from "./createBulkTransaction";
import createTransaction from "./createTransaction";
import getTransactions from "./getTransactions";
import { createPartyRequest } from "./party/createParty";
import getParties from "./party/getParties";
import getPartyById from "./party/getPartyById";
import { updatePartyRequest } from "./party/updateParty";
import getSummary from "./summary/getSummary";

export default {
  api,
  auth,
  summary: {
    getSummary,
  },
  party: {
    getParties,
    getPartyById,
    createPartyRequest,
    updatePartyRequest,
  },
  getTransactions,
  createBulkTransaction,
  createTransaction,
};
