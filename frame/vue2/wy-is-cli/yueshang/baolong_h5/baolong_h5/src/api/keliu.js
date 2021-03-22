import { post } from "./api";

export const getProjectFlow = (params) => post("/plpms-report/bis/passengerFlowRanking/queryPassengerFlowWhenCurDayForPassengerFlowRanking", params);
