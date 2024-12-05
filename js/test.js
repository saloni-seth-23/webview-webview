import { setCookie, clearAllCookies } from './utils.js';

/**
 * Function to set multiple cookies
 */
function setHardcodedCookies() {
    setCookie('AUTH_SESSION_ID', 'Bearer eyJraWQiOiJDdTREOHciLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzM2NjA2OTAsImlhdCI6MTczMzM4MzM5OCwibmJmIjoxNzMzMzgzMzQ4LCJzdWIiOiJ7XCJlbWFpbElkXCI6XCJ2aWthc3NoYXJtYTE1OUBnbWFpbC5jb21cIixcInBsYXRmb3JtXCI6XCJhbmRyb2lkXCIsXCJwbGF0Zm9ybVZlcnNpb25cIjpcIjk5Ljk5XCIsXCJvc1wiOlwiYW5kcm9pZFwiLFwib3NWZXJzaW9uXCI6XCIxNVwiLFwiaXBBZGRyZXNzXCI6XCIxNzIuMTYuMzMuNDksMTAuMS4xMC4xMSwxMC4xLjE3My42NiwxMC4xNS40Ny4yNDJcIixcIm1hY0FkZHJlc3NcIjpudWxsLFwidXNlckFnZW50XCI6XCJva2h0dHAvNS4wLjAtYWxwaGEuMTBcIixcImdyb3d3VXNlckFnZW50XCI6XCJBbmRyb2lkIERhbHZpay8yLjEuMCAoTGludXg7IFU7IEFuZHJvaWQgMTU7IFBpeGVsIDZhIEJ1aWxkL0FQM0EuMjQxMTA1LjAwNylcIixcImRldmljZUlkXCI6XCIzZDgxNGYyZC1lOWEzLTQ2Y2ItOTBiMC02YWM2MjNlOTczZjRcIixcInNlc3Npb25JZFwiOlwiYmIzYjdlMDAtYmZiOS00Mzk2LWFhYWMtZmM3NDhhZDBlNjI2XCIsXCJzdXBlckFjY291bnRJZFwiOlwiQUNDNDczMTc1MDUwODE3OFwiLFwidXNlckFjY291bnRJZFwiOlwiQUNDNDczMTc1MDUwODE3OFwiLFwidHlwZVwiOlwiQVRcIixcInRva2VuRXhwaXJ5XCI6MTczMzY2MDY5MDA0NixcInRva2VuSWRcIjpcIjFhOTBlZWU4LWQxM2UtNDNiNS04NDE1LTliOGE0OWIwNjUxNFwifSIsImlzcyI6Imdyb3d3YmlsbGlvbiJ9.1CXAGo5Q1Fek68zgCzb4WGx0BchxLYLnxgDTmYNymxMVHArHrGF35-mNJJgnMeNbWOmZrpPqyvv2DWwshJHuSA'); // Truncated for brevity
    setCookie('docket_id', '675176fd869875be0ee04fc6');
    setCookie('signer_id', '675176fd869875be0ee04fc8');
    setCookie('document_id', '675176fd869875be0ee04fc7');
    setCookie('reference_id', 'S01JEAV7EE0PTCP2EV2WQ7E3G29');

    setTimeout(() => {
        alert("Cookies set successfully! Refreshing the page...");
        window.location.reload();
    }, 500);
}


function createButton(text, onClickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClickHandler);
    document.body.appendChild(button);
}

function initialize() {
    // Create and append a new div
    const newDiv = document.createElement('div');
    newDiv.textContent = 'Local Script Testing';
    document.body.appendChild(newDiv);

    // Add "Set Cookies" button
    createButton('Set Hardcoded Cookies', setHardcodedCookies);

    // Add "Clear Cookies" button
    createButton('Clear Cookies', () => {
        clearAllCookies();
        setTimeout(() => {
            alert("Cookies cleared. Refreshing the page...");
            window.location.reload();
        }, 500);
    });
}

// Initialize the script on page load
initialize();
