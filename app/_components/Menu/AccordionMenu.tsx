import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import NestedAccordion from './NestedAccordion';
import useGetMenu from "@/app/api/menu/hook";;
import { useState } from 'react';
import Cookies from 'js-cookie';
import { MenuResponse } from '@/types/types';

// start styling the accordion children

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({

  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '1rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#E9E9E9',
  borderBottom: '2px solid rgba(255,255,255, 0.3);',
  flexDirection: 'row',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(90deg)',
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
    color:"#333"
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: 'none',
  padding:"0",
  paddingRight:"10px",
  backgroundColor:"#EFEFEF"
}));

// end styling accordion children

type AccordionMenuProps = {
    toggleDrawer: (open: boolean) => (event:any) => void;
}

export default function AccordionMenu({toggleDrawer}:AccordionMenuProps) {

  // handle openning the nested accordions
  const [expanded, setExpanded] = React.useState('');
  const [expandedNested, setExpandedNested] = React.useState('');
  const [expandedNestedNested, setExpandedNestedNested] = React.useState('');

  const handleChange = (panel:any) => (event:any, newExpanded:any) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleNestedChange = (panel:any) => (event:any, newExpanded:any) => {
    setExpandedNested(newExpanded ? panel : false);
  };

  const handleNestedNestedChange = (panel:any) => (event:any, newExpanded:any) => {
    setExpandedNestedNested(newExpanded ? panel : false);
  };

const [menuData, setMenuData] = useState<MenuResponse | null>(null);

  React.useEffect(() => {
    if(Cookies.get('MenuData')){
      const data = JSON.parse(Cookies.get('MenuData') || '');
      setMenuData(data);
    }else{
      const fetchData = async () => {
        try {
          const data = await useGetMenu();
          setMenuData(data);
        } catch (error) {
          console.error('Failed to fetch menu:', error);
        }
      };
  
      fetchData();
    }
  }, []);
  const firstData = menuData?.Data || [] ;
  const Data = firstData.length > 0 ? firstData[0].children : [];

  return (
    <>
    {/* start accordion menu */}

    {/* structure of one accardion */}
      {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      {/* structure of one accardion */}
      {/* structure of nested accordion */}
      {
        Data.map((item) => (
          <div key={item.Id}>
          <Accordion expanded={expanded === `panel${item.Id}`} onChange={handleChange(`panel${item.Id}`)} onClick={() => handleMouseClick(item.Id)}>
          <AccordionSummary aria-controls={`panel${item.Id}d-content`} id={`panel${item.Id}d-header`}>
            <Typography component="span">{item.Name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
            <NestedAccordion
            expandedNested={expandedNested}
            handleNestedChange={handleNestedChange}
            expandedNestedNested={expandedNestedNested}
            handleNestedNestedChange={handleNestedNestedChange}
            toggleDrawer={toggleDrawer}
            //api
            nameLink={item.Name}
            item={item}
          />
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>
        ))    
      }
      {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography component="span">مواد غذایی</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <NestedAccordion
          expandedNested={expandedNested}
          handleNestedChange={handleNestedChange}
          expandedNestedNested={expandedNestedNested}
          handleNestedNestedChange={handleNestedNestedChange}
        />
          </Typography>
        </AccordionDetails>
      </Accordion> */}

      {/* structure of nested accordion */}
      {/* *********************************************** */}
      {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography component="span">Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
      {/* end accordion menu */}
    </>
  );
}
