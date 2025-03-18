"use client";
import React, { useContext
,  useState, useEffect } from 'react';
import Script from 'next/script';
import { Button } from "../components/ui/button";
import { UserDetailContext } from './_context/UserDetailContext';
import { db } from 'configs/db';
import { Users } from 'configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation'; // Import useRouter

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [txid, setTxid] = useState(null);
  const [username, setUsername] = useState('');
  const [piInitialized, setPiInitialized] = useState(false);
  const { setUserDetail } = useContext(UserDetailContext); // Access setUserDetail from context
  const router = useRouter();


  useEffect(() => {
    // Do nothing here. The SDK will call authenticate after it loads.
  }, []);

  const authenticateUser = () => {
    const scopes = ['payments', 'username'];
    function onIncompletePaymentFound(payment) {
      completePaymentOnServer(payment.identifier);
    }

    if (window.Pi) {
      window.Pi.authenticate(scopes, onIncompletePaymentFound)
        .then(auth => {
          setIsAuthenticated(true);
          verifyTokenOnServer(auth.accessToken);

        })
        .catch(error => {
          console.error("Authentication error:", error);
        });
    } else {
      console.error("Pi SDK not initialized yet.  Trying again later.");
    }
  };

  const verifyTokenOnServer = async (accessToken) => {
    try {
      const response = await fetch('/api/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      const data = await response.json();

      if (data.success) {
        setUsername(data.data.username || 'N/A'); // Set username from API
        // Update user detail context
        setUserDetail({ pi_username: data.data.username });


        router.push('/dashboard'); 
      } else {
        console.error('Token verification failed:', data.error);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };


  const createPayment = () => {
    if (window.Pi) {
      window.Pi.createPayment({
        amount: 5,
        memo: "Test Payment",
        metadata: { item: "Test Item" }
      }, {
        onReadyForServerApproval: paymentId => {
          setPaymentId(paymentId);
          approvePaymentOnServer(paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          setPaymentId(paymentId);
          setTxid(txid);
          completePaymentOnServer(paymentId, txid);
        },
        onCancel: paymentId => {
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

      if  (data.success) {        //console.log('Payment approved on server:', data.data);
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
      case 'product':
        window.Pi.init({ version:'2.0',sandbox:false})
        //console.log(window.Pi);
        setPiInitialized(true);  // Set the state to indicate SDK is initialized
        break; // Corrected: Add break to prevent fall-through
      default:
        //console.log("Pi environment mode not specified or invalid.");
    }

  }

  return (
    <div>
      <Script src="https://sdk.minepi.com/pi-sdk.js" onReady={PiInit}/>
      <div className="flex justify-center items-center mt-5">
      <Button onClick={authenticateUser} disabled={isAuthenticated}> SIGN IN WITH PI BROWSER </Button>
      </div>
      {isAuthenticated ? (
        <div className="flex justify-center items-center mt-5">
          {!piInitialized && <p>Pi SDK initializing...</p>}
          {username && <p>Welcome, {username}!</p>}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-5">
        <p>Please sign in with the Pi Browser.</p>
        </div>
      )}


    </div>

  );
}

export default Home;

