import { api } from "./api";
import auth from "./auth";
import createBulkTransaction from "./createBulkTransaction";
import createTransaction from "./createTransaction";
import getTransactions from "./getTransactions";
import { createPartyRequest } from "./party/createParty";
import getParties from "./party/getParties";
import getPartyById from "./party/getPartyById";
import { updatePartyRequest } from "./party/updateParty";
import getMonthlySummary from "./summary/getMonthlySummary";
import getSummary from "./summary/getSummary";
import getTransactionByID from "./transaction/getTransactionById";

export default {
  api,
  auth,
  summary: {
    getSummary,
    getMonthlySummary,
  },
  party: {
    getParties,
    getPartyById,
    createPartyRequest,
    updatePartyRequest,
  },
  transaction: {
    getTransactions,
    createBulkTransaction,
    createTransaction,
    getTransactionByID,
  },

  getTransactions,
  createBulkTransaction,
  createTransaction,
};
