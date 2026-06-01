import { IconType } from "react-icons";

export type ThooksProps = {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
};

export type TlogoMarqueeProps = {
   children: React.ReactNode;
   baseVelocity: number;
};
export type TperspectiveTextProps = {
   children: React.ReactNode;
};

export type TMenuItemProps = {
   onClick: () => void;
   label: string;
   icon?: IconType | any;
};

export type TAvatarProps = {
   src: string | null | undefined;
};

export type TImageUploadProps = {
   onChange: (value: string) => void;
   value: string;
};
export type TimageUploadProps = {
   onImageUpload: (url: string) => void;
};

export type TservicesProps = {
   id: string;
   imageUrl: string;
   title: string;
   description: string;
};

export type TprocessProps = {
   id: string;
   title: string;
   description: string;
   videoUrl: string;
};

export type TservicesPageProps = {
   id: string;
   title: string;
   description: string;
   listOne: string;
   listTwo: string;
};