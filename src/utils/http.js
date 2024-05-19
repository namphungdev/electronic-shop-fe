import axios from "axios";
import { interceptorsRequest } from "./interceptorsRequest";
import { interceptorsResponse } from "./interceptorsResponse";

export const http = axios.create();
interceptorsRequest(http);
interceptorsResponse(http);
