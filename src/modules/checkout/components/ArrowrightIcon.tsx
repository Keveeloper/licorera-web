import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled } from '@mui/system';

const ArrowRightIcon = styled(ArrowDropDownIcon)(({ theme }) => ({
  transform: 'rotate(-90deg)',
}));

export default ArrowRightIcon;