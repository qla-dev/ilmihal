import React from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface NamazFooterCTAProps {
  currentRekat: number;
  totalRekats: number;
  activeStepIndex: number;
  totalSteps: number;
  partName: string;
  canPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export const NamazFooterCTA: React.FC<NamazFooterCTAProps> = ({
  currentRekat,
  totalRekats,
  activeStepIndex,
  totalSteps,
  partName,
  canPrev,
  onNext,
  onPrev,
}) => {
  const isFinalStepOfPart = currentRekat === totalRekats && activeStepIndex === totalSteps - 1;
  const isEndOfRekat = activeStepIndex === totalSteps - 1;

  return (
    <footer className="flex-shrink-0 z-30 bg-[#F5F4F0] border-t border-[#E2E1D9] shadow-md">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center space-x-2.5">
          {canPrev && (
            <button
              id="namaz-footer-prev-btn"
              onClick={onPrev}
              className="flex-1 py-3 px-3 rounded-2xl bg-white hover:bg-[#FAF9F5] text-[#2C3333] border border-[#E2E1D9] font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-2xs cursor-pointer active:scale-[0.98]"
            >
              <ChevronLeft className="w-4 h-4 text-[#636B69]" />
              <span>Prethodno</span>
            </button>
          )}

          <button
            id="namaz-footer-next-btn"
            onClick={onNext}
            className={`flex-2 py-3 px-5 rounded-2xl font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer active:scale-[0.99] ${
              isFinalStepOfPart
                ? 'bg-[#1B4332] hover:bg-[#16302B] text-white ring-2 ring-[#C29B38]/50'
                : 'bg-[#16302B] hover:bg-[#1B4332] text-white'
            }`}
          >
            {isFinalStepOfPart ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#C29B38]" />
                <span className="truncate">Završi {partName}</span>
              </>
            ) : isEndOfRekat ? (
              <>
                <span className="truncate">Pređi na {currentRekat + 1}. Rek'at</span>
                <ChevronRight className="w-4 h-4 text-[#C29B38]" />
              </>
            ) : (
              <>
                <span className="truncate">
                  Sljedeći korak ({activeStepIndex + 2}/{totalSteps})
                </span>
                <ChevronRight className="w-4 h-4 text-[#C29B38]" />
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
