import { useState } from "react";
import { Mic, MicOff, Plus, Clock, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RecordedMeal {
  id: number;
  text: string;
  timestamp: string;
}

interface MealRecorderProps {
  onQuickAdd: (text: string) => void;
}

const MealRecorder = ({ onQuickAdd }: MealRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [quickText, setQuickText] = useState("");
  const [recordings, setRecordings] = useState<RecordedMeal[]>([
    { id: 1, text: "25 plates of Vegetable Biryani from Green Valley", timestamp: "Today, 9:30 AM" },
    { id: 2, text: "40 croissants from Baker's Delight", timestamp: "Today, 8:15 AM" },
    { id: 3, text: "15 kg Fresh Salad from FreshMart", timestamp: "Yesterday, 6:00 PM" },
  ]);

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording - simulate adding a recorded meal
      setIsRecording(false);
      const newRecording: RecordedMeal = {
        id: Date.now(),
        text: "Voice recording captured - processing...",
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setRecordings((prev) => [newRecording, ...prev]);
    } else {
      setIsRecording(true);
    }
  };

  const handleQuickAdd = () => {
    if (!quickText.trim()) return;
    const newRecording: RecordedMeal = {
      id: Date.now(),
      text: quickText,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    setRecordings((prev) => [newRecording, ...prev]);
    onQuickAdd(quickText);
    setQuickText("");
  };

  return (
    <div className="glass-card p-5 animate-slide-up">
      <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
        🎙️ Meal Recorder
      </h3>

      {/* Quick text input */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Quick log: e.g. 25 plates biryani..."
          value={quickText}
          onChange={(e) => setQuickText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleQuickAdd()}
          className="rounded-xl text-sm"
        />
        <Button onClick={handleQuickAdd} size="icon" className="rounded-xl shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Voice record button */}
      <button
        onClick={handleRecord}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all mb-4 ${
          isRecording
            ? "bg-buzzer text-primary-foreground animate-pulse-buzzer"
            : "bg-muted text-muted-foreground hover:bg-border hover:text-foreground"
        }`}
      >
        {isRecording ? (
          <>
            <MicOff className="h-4 w-4" /> Stop Recording
          </>
        ) : (
          <>
            <Mic className="h-4 w-4" /> Tap to Record Voice Note
          </>
        )}
      </button>

      {/* Recent recordings */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Logs</p>
        {recordings.slice(0, 5).map((rec) => (
          <div key={rec.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="h-8 w-8 rounded-lg bg-grape-soft flex items-center justify-center shrink-0 mt-0.5">
              <Camera className="h-4 w-4 text-grape" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-snug truncate">{rec.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {rec.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealRecorder;
