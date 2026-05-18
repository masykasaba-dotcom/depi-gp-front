import { useState, useEffect } from "react";
import AccountLayout from "../layouts/AccountLayout";
import { CreditCard, Check, Trash2, X, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export default function PaymentMethods() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("derma_saved_cards");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: "card-1",
        type: "Visa",
        last4: "4242",
        expiry: "12/25",
        isDefault: true,
        name: "Eleanor Vance"
      },
      {
        id: "card-2",
        type: "Mastercard",
        last4: "5555",
        expiry: "08/27",
        isDefault: false,
        name: "Eleanor Vance"
      }
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });

  useEffect(() => {
    localStorage.setItem("derma_saved_cards", JSON.stringify(cards));
  }, [cards]);

  function handleSetDefault(id) {
    setCards(prev =>
      prev.map(c => ({
        ...c,
        isDefault: c.id === id
      }))
    );
    toast.success("Default payment method updated");
  }

  function handleDeleteCard(id, e) {
    e.stopPropagation();
    const toDelete = cards.find(c => c.id === id);
    if (toDelete?.isDefault && cards.length > 1) {
      toast.error("Please set another card as default first.");
      return;
    }
    setCards(prev => prev.filter(c => c.id !== id));
    toast.success("Card removed successfully");
  }

  function handleAddCardSubmit(e) {
    e.preventDefault();
    if (!newCard.number || !newCard.name || !newCard.expiry || !newCard.cvc) {
      toast.error("Please fill in all fields.");
      return;
    }

    const cleanedNumber = newCard.number.replace(/\s/g, "");
    if (cleanedNumber.length < 16) {
      toast.error("Invalid card number.");
      return;
    }

    const cardType = cleanedNumber.startsWith("4") ? "Visa" : "Mastercard";
    const last4 = cleanedNumber.slice(-4);

    const addedCard = {
      id: `card-${Date.now()}`,
      type: cardType,
      last4,
      expiry: newCard.expiry,
      isDefault: cards.length === 0,
      name: newCard.name
    };

    setCards(prev => [...prev, addedCard]);
    setShowAddModal(false);
    setNewCard({ number: "", name: "", expiry: "", cvc: "" });
    toast.success("Payment method added successfully");
  }

  return (
    <AccountLayout>
      <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6 lg:p-8 shadow-sm">
        {/* Header */}
        <div className="border-b border-[#E8E4DE]/50 pb-6 mb-8">
          <h2 className="font-display-lg text-[22px] text-[#06373A] leading-tight mb-1.5">
            Payment Methods
          </h2>
          <div className="flex items-start gap-2.5 mt-2.5 text-[#555a5b]">
            <ShieldAlert size={16} className="text-[#06373A] flex-shrink-0 mt-0.5" />
            <p className="font-body-md text-[13px] leading-relaxed">
              Your payment information is securely encrypted and stored with clinical-grade protection.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => {
            const isVisa = card.type === "Visa";
            return (
              <div
                key={card.id}
                onClick={() => handleSetDefault(card.id)}
                className={`relative rounded-2xl border p-6 flex flex-col justify-between min-h-[190px] cursor-pointer hover:shadow-md transition-all duration-300 ${
                  card.isDefault
                    ? "border-[#06373A] bg-white ring-1 ring-[#06373A]"
                    : "border-[#E8E4DE] bg-white"
                }`}
              >
                {/* Top Row: Card Vendor & Default status */}
                <div className="flex items-center justify-between">
                  {isVisa ? (
                    <span className="font-serif italic font-extrabold text-[#06373A] text-[20px] tracking-wider leading-none">
                      VISA
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-[#ff5f5f] opacity-80" />
                      <div className="w-5 h-5 rounded-full bg-[#ffb75f] opacity-80 -ml-2.5" />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {card.isDefault && (
                      <span className="bg-[#032b26] text-white text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-[4px]">
                        DEFAULT
                      </span>
                    )}
                    <button
                      onClick={(e) => handleDeleteCard(card.id, e)}
                      className="p-1 text-on-secondary-container hover:text-red-500 transition-colors"
                      title="Remove Card"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Card Number Masked */}
                <div className="my-6">
                  <p className="font-display-lg text-[16px] tracking-[0.25em] text-[#06373A]">
                    •••• •••• •••• {card.last4}
                  </p>
                </div>

                {/* Expiration Details */}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-[8px] font-bold tracking-wider text-on-secondary-container uppercase mb-0.5">
                      EXPIRES
                    </span>
                    <span className="font-body-md text-[13px] text-[#06373A] font-semibold">
                      {card.expiry}
                    </span>
                  </div>
                  <span className="font-body-md text-[11px] text-on-secondary-container uppercase truncate max-w-[120px]">
                    {card.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Dotted "Add New Payment Method" Card */}
          <div
            onClick={() => setShowAddModal(true)}
            className="rounded-2xl border border-dashed border-[#C9C6C5] bg-[#FAF9F6]/50 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#06373A]/5 hover:border-[#06373A] transition duration-300 min-h-[190px]"
          >
            <div className="w-9 h-9 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#06373A] mb-3 text-lg font-semibold shadow-inner">
              ➕
            </div>
            <p className="font-display-lg text-[13px] font-semibold text-[#06373A] mb-0.5">
              Add New Payment Method
            </p>
            <p className="font-body-md text-[11px] text-on-secondary-container">
              Securely link a new card to your account.
            </p>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8E4DE] shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-on-secondary-container hover:bg-gray-100 hover:text-black transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-display-lg text-[18px] text-[#06373A] mb-1.5 flex items-center gap-2">
              <CreditCard size={18} />
              Add Payment Method
            </h3>
            <p className="font-body-md text-[12px] text-on-secondary-container mb-6">
              Enter your card details. Cards are encrypted and stored locally.
            </p>

            <form onSubmit={handleAddCardSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  maxLength="19"
                  placeholder="0000 0000 0000 0000"
                  value={newCard.number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    const formatted = value.replace(/(.{4})/g, "$1 ").trim();
                    setNewCard(prev => ({ ...prev, number: formatted }));
                  }}
                  className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Eleanor Vance"
                  value={newCard.name}
                  onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                    Expiration (MM/YY)
                  </label>
                  <input
                    type="text"
                    maxLength="5"
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      let formatted = value;
                      if (value.length > 2) {
                        formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                      }
                      setNewCard(prev => ({ ...prev, expiry: formatted }));
                    }}
                    className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider uppercase text-[#06373A] mb-1.5">
                    CVC
                  </label>
                  <input
                    type="password"
                    maxLength="3"
                    placeholder="CVC"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, "") }))}
                    className="w-full h-10 px-3 border border-outline-variant/50 rounded-lg text-sm bg-[#FAF9F6] outline-none focus:border-[#06373A] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-outline-variant/60 rounded-lg text-xs font-semibold text-[#555a5b] hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#032b26] text-white hover:bg-[#06373A] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}
