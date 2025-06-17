<?php

declare(strict_types=1);

namespace Nuxtifyts\Lumen\Support\Blade\Components\Primitive;

/**
 * @note Generated using Github Copilot
 */
enum AsTag: string
{
    // Most common structural elements
    case Div = 'div';
    case A = 'a';
    case Button = 'button';
    case Img = 'img';
    case Form = 'form';
    case Input = 'input';
    case Label = 'label';
    case Span = 'span';
    case Nav = 'nav';

    // Lists
    case Ul = 'ul';
    case Ol = 'ol';
    case Li = 'li';

    // Headings
    case H1 = 'h1';
    case H2 = 'h2';
    case H3 = 'h3';
    case H4 = 'h4';
    case H5 = 'h5';
    case H6 = 'h6';

    // Text content
    case P = 'p';
    case Pre = 'pre';
    case Strong = 'strong';
    case Em = 'em';
    case Small = 'small';
    case Mark = 'mark';
    case Code = 'code';
    case Kbd = 'kbd';
    case Samp = 'samp';
    case Var = 'var';
    case Sub = 'sub';
    case Sup = 'sup';
    case Abbr = 'abbr';
    case Time = 'time';
    case Cite = 'cite';
    case Q = 'q';
    case Blockquote = 'blockquote';

    // Semantic HTML5 elements
    case Main = 'main';
    case Section = 'section';
    case Article = 'article';
    case Header = 'header';
    case Footer = 'footer';
    case Aside = 'aside';
    case Address = 'address';

    // Tables
    case Table = 'table';
    case Thead = 'thead';
    case Tbody = 'tbody';
    case Tfoot = 'tfoot';
    case Tr = 'tr';
    case Th = 'th';
    case Td = 'td';
    case Caption = 'caption';
    case Colgroup = 'colgroup';
    case Col = 'col';

    // Forms
    case Fieldset = 'fieldset';
    case Legend = 'legend';
    case Select = 'select';
    case Option = 'option';
    case Optgroup = 'optgroup';
    case Textarea = 'textarea';
    case Datalist = 'datalist';
    case Output = 'output';
    case Progress = 'progress';
    case Meter = 'meter';

    // Media
    case Video = 'video';
    case Audio = 'audio';
    case Source = 'source';
    case Track = 'track';
    case Canvas = 'canvas';
    case Picture = 'picture';
    case Figure = 'figure';
    case Figcaption = 'figcaption';
    case Svg = 'svg';

    // Interactive
    case Details = 'details';
    case Summary = 'summary';
    case Dialog = 'dialog';
    case Menu = 'menu';

    // Definition lists
    case Dl = 'dl';
    case Dt = 'dt';
    case Dd = 'dd';

    // Line breaks and formatting
    case Br = 'br';
    case Hr = 'hr';
    case Wbr = 'wbr';

    // Less common but useful
    case Del = 'del';
    case Ins = 'ins';
    case S = 's';
    case U = 'u';
    case B = 'b';
    case I = 'i';
    case Bdi = 'bdi';
    case Bdo = 'bdo';
    case Ruby = 'ruby';
    case Rt = 'rt';
    case Rp = 'rp';
    case Data = 'data';
    case Template = 'template';

    /**
     * Determines if the HTML tag is self-closing (void element)
     */
    public function isSelfClosing(): bool
    {
        return match ($this) {
            self::Img,
            self::Input,
            self::Br,
            self::Hr,
            self::Source,
            self::Track,
            self::Col,
            self::Wbr => true,
            default => false,
        };
    }
}
