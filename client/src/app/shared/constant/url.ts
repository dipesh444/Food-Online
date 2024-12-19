import { environment } from "../../environment/environment";

const BASE_URL = environment.production ? "":"http://localhost:5000";

export const FOODS_URL= BASE_URL+'/api/foods';
export const FOODS_SEARCH_URL= FOODS_URL+'/search/';
export const FOODS_BY_TAGS_URL= FOODS_URL+'/tags';
export const FOODS_BY_TAG_URL= FOODS_URL+'/tag/';


export const USER_LOGIN_URL= BASE_URL+'/api/user/login';
export const USER_REGISTER_URL= BASE_URL+'/api/user/register';
export const CHECKOUT_URL=`${BASE_URL}/api/payment/checkout`