type downloadType = 'jpeg' | 'png' | 'pdf';

export interface ITranslationContext {
    type: downloadType;
    content?: string;
    width?: number;
    height?: number;
    format?: any;
    raw?: boolean;
    selector?: string;
}

export const TranslationDefaults : ITranslationContext = {
    type: 'png',
    width: 1920,
    height: 1080,
    format: 'Letter',
    raw: false
};
