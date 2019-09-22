import Theme from '@/services/Theme';

const theme = Theme.getTheme();

document.body.classList.add('theme-' + theme);
