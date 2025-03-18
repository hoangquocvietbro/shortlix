"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script'
import { Button } from "../components/ui/button";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [txid, setTxid] = useState(null);
  const [username, setUsername] = useState('');

  const [piInitialized, setPiInitialized] = useState(false);  // Track SDK initialization


  useEffect(() => {
    // Do nothing here. The SDK will call authenticate after it loads.

  }, []);


  const authenticateUser = () => {
    //console.log("aaaa")
    const scopes = ['payments', 'username'];
    function onIncompletePaymentFound(payment) {
      //console.log("Incomplete payment found:", payment);
      // Gửi thanh toán đến máy chủ của bạn để xử lý
      completePaymentOnServer(payment.identifier);
    }
    //console.log("bbbb")
    if (window.Pi) { //console.log("cccc")// Ensure Pi object exists before calling methods
    window.Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(auth => {
        //console.log("Authentication successful!", auth);
        setIsAuthenticated(true);
        // Xác minh trên máy chủ
        verifyTokenOnServer(auth.accessToken);

      })
      .catch(error => {
        console.error("Authentication error:", error);
      });
    } else {
      console.error("Pi SDK not initialized yet.  Trying again later.");
      // Optionally, retry the authentication after a short delay:
      // setTimeout(authenticateUser, 1000);  // Retry after 1 second
    }
  };

  const verifyTokenOnServer = async (accessToken) => {
    try {
      const response = await fetch('/api/me', { // Call /api/me route
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      const data = await response.json();

      if (data.success) {
        //console.log('User data verified:', data.data);
        setUsername(data.data.username || 'N/A'); // Set username from API
      } else {
        console.error('Token verification failed:', data.error);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };


  const createPayment = () => {
    if (window.Pi) { // Ensure Pi object exists before calling methods
      window.Pi.createPayment({
        amount: 5,
        memo: "Test Payment",
        metadata: { item: "Test Item" }
      }, {
        onReadyForServerApproval: paymentId => {
          //console.log("Payment ready for server approval:", paymentId);
          setPaymentId(paymentId);
          approvePaymentOnServer(paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          //console.log("Payment ready for server completion:", paymentId, txid);
          setPaymentId(paymentId);
          setTxid(txid);
          completePaymentOnServer(paymentId, txid);
        },
        onCancel: paymentId => {
          //console.log("Payment cancelled:", paymentId);
          setPaymentId(null);
          setTxid(null);
        },
        onError: (error, payment) => {
          console.error("Payment error:", error, payment);
          setPaymentId(null);
          setTxid(null);
        }
      });
    } else {
      console.error("Pi SDK not initialized yet.");
    }
  };

  const approvePaymentOnServer = async (paymentId) => {
    try {
      const response = await fetch('/api/approve-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId }),
      });

      const data = await response.json();

      if (data.success) {
        //console.log('Payment approved on server:', data.data);
      } else {
        console.error('Error approving payment:', data.error);
      }
    } catch (error) {
      console.error('Error approving payment:', error);
    }
  };

  const completePaymentOnServer = async (paymentId, txid) => {
    try {
      const response = await fetch('/api/complete-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId, txid }),
      });

      const data = await response.json();

      if (data.success) {
        //console.log('Payment completed on server:', data.data);
      } else {
        console.error('Error completing payment:', data.error);
      }
    } catch (error) {
      console.error('Error completing payment:', error);
    }
  };

  function PiInit(){
    switch (process.env.NEXT_PUBLIC_MODE){
      case 'sandbox':
        window.Pi.init({ version:'2.0',sandbox:true})
        //console.log(window.Pi);
        setPiInitialized(true);  // Set the state to indicate SDK is initialized
        // Now that Pi is initialized, you can attempt authentication.
        
        break; // Corrected: Add break to prevent fall-through
      default:
        //console.log("Pi environment mode not specified or invalid.");
    }

  }


  return (
    <div>
      <Script src="https://sdk.minepi.com/pi-sdk.js" onReady={PiInit}/>
      <div className="flex justify-center items-center mt-5">
      <Button onClick={authenticateUser} disabled={!piInitialized}> SIGN IN WITH PI BROWSER </Button>
      </div>
      {isAuthenticated ? (
        <div>
              <div className="flex justify-center items-center mt-5">
      {/* <ThemeToggle /> */}
        

      
      {/* Embed another site using an iframe */}
    </div>
          <button onClick={createPayment} disabled={!piInitialized}>Make Payment</button>
          {!piInitialized && <p>Pi SDK initializing...</p>}
        </div>
      ) : (
        <p></p>
      )}
      {paymentId && <p>Payment ID: {paymentId}</p>}
      {txid && <p>Transaction ID: {txid}</p>}


    </div>

  );
}

export default Home;
