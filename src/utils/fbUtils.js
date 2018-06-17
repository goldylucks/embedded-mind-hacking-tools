import { MAIN_SITE_DOMAIN } from "../constants";

export const getFbShareUrl = path =>
  `https://www.facebook.com/sharer/sharer.php?u=${MAIN_SITE_DOMAIN}${path}`;
