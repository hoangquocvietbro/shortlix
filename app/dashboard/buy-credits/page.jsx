// pearCreateFile: app/dashboard/buy-credits/page.jsx
"use client";
import React, { useState, useEffect, useContext } from "react";
import Script from 'next/script';
import { toast } from "sonner";
import { db } from "configs/db";
import { UserContext } from "app/_context/UserContext";
import { Users } from "configs/schema";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import CustomBuy from "./_components/CustomBuy";

function BuyCredits() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [txid, setTxid] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [isSubscribed, setIsSubscribed] = useState(
    user?.subscription || false
  );
  const [loading, setLoading] = useState(false);
  const [isSelectedOption, setIsSelectedOption] = useState(false);
  const [selectedCreditsOption, setSelectedCreditsOption] = useState(null);
  const [piInitialized, setPiInitialized] = useState(false);
  useEffect(() => {
    if (user && !piInitialized) {  // Only initialize if not already initialized
      PiInit();
    }
  }, [user, piInitialized]);

  const getUserDetail = async () => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.pi_username, user?.pi_username));

      if (result && result[0]) {
        setUser(result[0]);
        setIsSubscribed(result[0].subscription);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to refresh user data");
    }
  };

  const authenticateUser = () => {
    const scopes = ['payments', 'username'];
    function onIncompletePaymentFound(payment) {
      completePaymentOnServer(payment.identifier);
    }

    if (window.Pi) {
      window.Pi.authenticate(scopes, onIncompletePaymentFound)
        .then(auth => {
          setIsAuthenticated(true);

        })
        .catch(error => {
          console.error("Authentication error:", error);
        });
    } else {
      console.error("Pi SDK not initialized yet.  Trying again later.");
    }
  };

  const handleUpgradeSubscription = async () => {
    setLoading(true);
    try {
      const result = await db
        .update(Users)
        .set({ subscription: true })
        .where(eq(Users.pi_username, user?.pi_username));

      //console.log("Updated user subscription:", result);

      // Update context and state
      setIsSubscribed(true);
      setUser((prev) => ({ ...prev, subscription: true }));

      // Show success toast
      toast.success("Subscription upgraded successfully!");
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      toast.error("Failed to upgrade subscription");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseCredits = async (amount) => {
    setLoading(true);
    try {
      // Updating credits in the database
      const result = await db
        .update(Users)
        .set({ credits: user.credits + amount })
        .where(eq(Users.pi_username, user?.pi_username));

      //console.log("Updated user credits:", result); // Debug log

      // Update user detail in context
      setUser((prev) => ({
        ...prev,
        credits: prev.credits + amount, // Add the purchased amount to credits
      }));

      toast.success(`${amount} credits purchased successfully!`);
      handleUpgradeSubscription();
    } catch (error) {
      console.error("Error purchasing credits:", error);
      toast.error("Failed to purchase credits");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedCreditsOption(option);
    setIsSelectedOption(true); // Open the dialog
  };

  // Pi Network Payment Handling
  const handlePiPayment = async (creditsOption) => {
    if (!piInitialized) {
      toast.error("Pi Network SDK not initialized.");
      return;
    }

    const amount = creditsOption.amount;
    const credits = creditsOption.credits;

    try {
      setLoading(true); // Add loading state
      const payment = await window.Pi.createPayment({
        amount: amount,
        memo: `Purchase ${credits} credits`,
        metadata: { 
          credits,
          pi_username: user?.pi_username,
          type: 'credits_purchase'
        }
      }, {
        onReadyForServerApproval: async (paymentId) => {
          setPaymentId(paymentId);
          await approvePaymentOnServer(paymentId);
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
          setPaymentId(paymentId);
          setTxid(txid);
          await completePaymentOnServer(paymentId, txid, credits);
        },
        onCancel: () => {
          setLoading(false);
          toast.error("Payment was cancelled");
        },
        onError: (error) => {
          setLoading(false);
          console.error("Payment error:", error);
          toast.error("Payment failed");
        }
      });
    } catch (error) {
      console.error("Error starting Pi Payment:", error);
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  //Pi Approve payment
  const approvePaymentOnServer = async (paymentId) => {
    try {
      const response = await fetch('/api/approve-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId: paymentId }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Payment approved on server:', data);
        // Payment approved successfully
      } else {
        console.error('Error approving payment on server:', data.error);
        // Handle error case
      }
    } catch (error) {
      console.error('Error communicating with server:', error);
      // Handle network or other errors
    }
  };

  //Pi Complete Payment
  const completePaymentOnServer = async (paymentId, txid, credits) => {
    setLoading(true);
    try {
      const response = await fetch('/api/complete-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          paymentId,
          txid,
          credits,
          pi_username: user?.pi_username
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Update local state with the data returned from the server
        setUser(data.data);
        setIsSubscribed(data.data.subscription);
        toast.success(`Payment completed! ${credits} credits added successfully!`);
      } else {
        throw new Error(data.error || 'Payment completion failed');
      }
    } catch (error) {
      console.error('Error in payment completion:', error);
      toast.error(error.message || "Failed to complete payment");
    } finally {
      setLoading(false);
    }
  };
  //Pi Cancel Payment
  const cancelPaymentOnServer = async (paymentId) => {
    setLoading(true);
    try {
      const response = await fetch('/api/cancel-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId: paymentId }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Payment cancelled on server:', data);
        // Payment cancelled successfully
        toast.success("Payment cancelled successfully!");
      } else {
        console.error('Error cancelling payment on server:', data.error);
        // Handle error case
        toast.error(`Payment cancellation failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error communicating with server:', error);
      // Handle network or other errors
      toast.error("Failed to communicate with the server.");
    } finally {
      setLoading(false);
    }
  };

  const PiInit = () => {
    if (window.Pi && !piInitialized) {  // Check if not already initialized
      switch (process.env.NEXT_PUBLIC_MODE) {
        case 'sandbox':
          window.Pi.init({ version: '2.0', sandbox: true });
          setPiInitialized(true);
          authenticateUser();
          break;
        case 'product':
          window.Pi.init({ version: '2.0', sandbox: false });
          setPiInitialized(true);
          break;
        default:
          console.error("Pi environment mode not specified or invalid.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  const creditsOption = [
    { "id": 3, "amount": 1.00, "credits": 100 },
    { "id": 5, "amount": 2.00, "credits": 220 },
    { "id": 7, "amount": 3.00, "credits": 350 },
    { "id": 9, "amount": 4.00, "credits": 500 },
    { "id": 11, "amount": 5.00, "credits": 670 },
    { "id": 13, "amount": 6.00, "credits": 860 },
    { "id": 15, "amount": 7.00, "credits": 1070 },
       { "id": 17, "amount": 8.00, "credits": 1300 },
      { "id": 19, "amount": 9.00, "credits": 1550 },
  ];

  return (
    <div className="p-4">
            <Script src="https://sdk.minepi.com/pi-sdk.js" onReady={PiInit}/>
      <h2 className="font-bold text-xl text-primary mb-6">Buy Credits</h2>
      <p className="text-gray-400 mt-1 font-semibold text-xs">
        Current Credits:{" "}
        <span className="text-white">{user?.credits || 0}</span>
      </p>
      <p className="text-gray-400 mt-1 font-semibold text-xs">
        You can generate:{" "}
        <span className="text-white">
          {Math.floor((user?.credits || 0) / 10)}
        </span>{" "}
        video(s) with your current credits.
      </p>
      <p className="text-gray-400 mt-1 font-semibold text-xs">
        You can generate:{" "}
        <span className="text-white">{user?.credits || 0}</span> voice(s)
        with your current credits.
      </p>
      <p className="text-gray-400 mt-1 font-semibold text-xs">
        You can translate:{" "}
        <span className="text-white">
          {Math.floor((user?.credits || 0) / 10)}
        </span>{" "}
        video(s) with your current credits.
      </p>
      <p className="text-gray-400 mt-1 font-semibold text-xs">
        You can use editor:{" "}
        <span className="text-white">
          {Math.floor((user?.credits || 0) / 10)}
        </span>{" "}
        time(s) with your current credits.
      </p>
      <p className="text-gray-400 mt-1 font-semibold text-xs">
      Subscription Status:{" "}
        <span
          className={`animate-pulse ${
            isSubscribed ? "text-green-500" : "text-red-500"
          }`}
        >
          {user?.subscription ? "Active" : "Inactive"}
        </span>
      </p>

      <h3 className="font-bold text-lg my-5">Buy More Credits</h3>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 ">
        {creditsOption.map((option) => {
          const costPerCredit = (option.amount / option.credits).toFixed(3);

          return (
            <Card
              onClick={(e) => {
                e.preventDefault();
                handleOptionSelect(option);
              }}
              key={option.id}
              className={`bg-neutral-900 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:border-primary ${
                isSelectedOption === option.id ? "border-primary border-2" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="mt-5 mb-10 text-center font-bold text-xl">
                  Add {option.credits} Credits
                </CardTitle>
                <CardDescription className="mt-10 text-center">
                  Purchase {option.credits} credits for {`${option.amount}𝜋`}.
                  <div className="flex flex-row items-center justify-center mt-14 gap-2">
                    <Image
                      src={"/coin.png"}
                      alt="coin"
                      width={50}
                      height={50}
                    />
                    <h2 className="text-3xl font-bold text-white drop-shadow-xl">
                      {option.credits}
                    </h2>
                  </div>
                  <p className="text-center mt-5">
                    This will allow you to generate{" "}
                    <strong className="text-primary">
                      {Math.floor(option.credits / 10)}
                    </strong>{" "}
                    video(s) and{" "}
                    <strong className="text-primary">{option.credits}</strong>{" "}
                    voice(s).
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent className="my-5 "></CardContent>
              <CardFooter>
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();  // Prevent event bubbling
                        handlePiPayment(option);
                    }}
                    className="text-center bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded"
                  >
                    Pay with {`${option.amount}𝜋`}
                  </button> 
                  <p className="text-xs text-gray-500">
                  For {`${option.amount}𝜋`} (~{costPerCredit}𝜋 per credit )  
                  </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
{/* 
      <CustomBuy
        isSelected={isSelectedOption}
        setIsSelected={setIsSelectedOption}
        title="Buy Credits"
        message={`You are about to purchase ${selectedCreditsOption?.credits} credits for $${selectedCreditsOption?.amount}.`}
        creditsOption={selectedCreditsOption}
        handlePurchaseCredits={handlePurchaseCredits} // Pass this function from parent
      /> */}
    </div>
  );
}

export default BuyCredits;

