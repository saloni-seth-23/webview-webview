/**
 * Sets a cookie in the browser.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} [days] - The number of days the cookie should persist. Defaults to 7 days if not provided.
 */
export function setCookie(name, value, days = 7) {
  const expires = new Date();

  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Expiration date in milliseconds
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
}

/**
 * Function to clear all cookies
 */
export function clearAllCookies() {
  document.cookie.split(";").forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  console.log("All cookies cleared!");
}


/**
 * Reads a specific value from browser cookies.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((acc, currentCookie) => {
    const [ key, value ] = currentCookie.split('=');

    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

  return cookies[name] || null;
}

/**
 * Utility function to get query parameters from the URL.
 * @param {string} paramName - The name of the query parameter to retrieve.
 * @param {string} [url=window.location.href] - Optional URL string. Defaults to the current page's URL.
 * @returns {string | null} - The value of the query parameter or null if not found.
 */
function getQueryParam(paramName, url = window.location.href) {
  try {
    const urlObj = new URL(url);

    return urlObj.searchParams.get(paramName);

  } catch (error) {
    console.error('Invalid URL provided:', error);
    return null;
  }
}

/**
 * This method can be used to dispatch any custom event.
 *
 * @param {string} eventName - Name of the event that you want to dispatch
 * @param {object} eventDetails - OPTIONAL param, eventDetails object can be used to pass extra details
 *
 * @remarks
 * It's strongly recommended to add the event name in utils/constants/CUSTOM_EVENTS and use. No literals allowed.
 *
 * @example
 * ```
 * dispatchCustomEvent(CUSTOM_EVENTS.file_loaded)
 * dispatchCustomEvent(CUSTOM_EVENTS.file_loaded, {user: 'Ella'})
 * ```
 */
export function dispatchCustomEvent(eventName, eventDetails = {}) {
  try {
    if (typeof document !== 'undefined') {
      const temp = document.documentElement;

      temp.dispatchEvent(new CustomEvent(eventName, { detail: eventDetails }));

    } else {
      throw new Error('window is undefined');
    }

  } catch (err) {
    console.error(`Error in dispatching custom event ${eventName} and details ${eventDetails} ${err}`);
  }
}


function postWindowMessage(postObj, eventIdentifier = 'CUSTOM_MESSAGE', targetWindow) {
  try {

    if (typeof window === 'undefined') {
      return;
    }

    const message = {
      ...postObj,
      identifier: eventIdentifier
    };

    const windowObj = typeof targetWindow === 'undefined' ? window : targetWindow;

    windowObj?.postMessage(JSON.stringify(message), window?.location?.origin ?? '*');
    console.log('postMessage sent successfully', message);

  } catch (error) {
    console.error('Error while window.postMessage', error);

    dispatchCustomEvent('TRACK LOG', {
      function: 'postWindowMessage',
      error
    });

    throw error;
  }
}

// Function to initialize the widget once the external script is loaded
export function initializeEsignWidget() {
  const authToken = getCookie('AUTH_SESSION_ID') ?? '';
  const docketId = getCookie('docket_id') ?? '';
  const signerId = getCookie('signer_id') ?? '';
  const documentId = getCookie('document_id') ?? '';
  const referenceId = getCookie('reference_id') ?? '';
  // From query parameters
  const isMobile = getQueryParam('mobile') ?? '';

  console.log('isMobile', isMobile);
  // Check if the someone opens from is not from mobile device;

// if(!queryParams?.isMobile && !authToken){
//     window.location.href = '/';
// }
  const options = {
    id: 'tata-capital-financial-services-limited_combined_uat',
    // ...queryParams,
    docket_id: docketId,
    signer_id: signerId,
    document_id: documentId,
    widget_width: '100%',
    widget_height: '100%',
    margin_top: '0px',
    getWidgetToken: function(result) {
      // Sending widget token to server for validation

      console.log('window', window.esignWidgetCall);
      if (
        typeof window !== 'undefined' &&
        typeof window.esignWidgetCall === 'function'
      ) {
        const headers = {
          'Content-Type': 'application/json',
          // routeId is only for staging.
          routeId: 'lamf',
          'X-REFERENCE-ID': referenceId,
          'Authorization': authToken
        };

        console.log('Headers', headers);
        fetch(
          'https://uatapi.groww.in/v1/api/credit-mapi/lamf/v1/validate-widget-token',
          {
            method: 'POST',
            headers,
            body: JSON.stringify({ widgetToken: result })
          }
        )
          .then((response) => {
            console.log('response', response);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response.status === 200) {
              console.log('Token validated successfully');
            }
          })
          // .then((data) => {
          //     //  can call the post message
          //     console.log("Widget token:", result);
          // })
          .catch((error) => {
            const postObj = {
              action: 'WEBVIEW_FAILURE'
            };

            postWindowMessage(postObj);

            console.error('Error validating widget token:', error);
          });
      }
    },
    signatureStatus: function(result) {
      // Call Post Message
      const postObj = {
        action: 'WEBVIEW_SUCCESS'
      };

      postWindowMessage(postObj);

      console.log('Signature status:', result);
    },
    errorLog: function(result) {
      // Logging error
      // Call Post Message
      const postObj = {
        action: 'WEBVIEW_FAILURE'
      };

      postWindowMessage(postObj);

      console.log('Error log:', result);
    }
  };

  // Initialize the e-sign widget
  esignWidgetCall(options);
  console.log('Document loaded and widget initialized.');
}
