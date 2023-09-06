export interface ICanvas {
  radius: number;
  color: string;
  clear: boolean;
  save: boolean;
  replay: boolean;
  setRadius: (color: number) => void;
  setColor: (color: string) => void;
  setClear: (clear: boolean) => void;
  setSave: (clear: boolean) => void;
  setReplay: (clear: boolean) => void;
}
