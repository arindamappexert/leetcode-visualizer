import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LogEntry {
  step: number;
  message: string;
  variables: Record<string, any>;
  timestamp: Date;
}

interface LogTracerProps {
  logs: LogEntry[];
  currentStep: number;
}

const LogTracer = ({ logs = [], currentStep = 0 }: LogTracerProps) => {
  // Filter logs up to the current step
  const visibleLogs = logs.filter((log) => log.step <= currentStep);

  return (
    <Card className="w-full bg-background border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-medium">Execution Log</h3>
      </div>
      <ScrollArea className="h-[300px] p-4">
        {visibleLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>
              No logs to display. Start the simulation to see execution logs.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleLogs.map((log, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${index === visibleLogs.length - 1 ? "bg-primary/10 border border-primary/20" : "bg-muted"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium">Step {log.step}</span>
                  <span className="text-xs text-muted-foreground">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm mb-2">{log.message}</p>
                {Object.keys(log.variables).length > 0 && (
                  <div className="bg-background/50 p-2 rounded border text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(log.variables).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-mono text-primary">{key}:</span>
                          <span className="font-mono">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default LogTracer;
