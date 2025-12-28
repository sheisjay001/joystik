import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  Button, 
  Menu, 
  MenuItem,
  useTheme
} from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

// Sample Data
const monthlyData = [
  { name: 'Jan', members: 400, events: 24, engagement: 65 },
  { name: 'Feb', members: 300, events: 13, engagement: 58 },
  { name: 'Mar', members: 550, events: 98, engagement: 82 },
  { name: 'Apr', members: 478, events: 39, engagement: 74 },
  { name: 'May', members: 689, events: 48, engagement: 88 },
  { name: 'Jun', members: 839, events: 38, engagement: 92 },
  { name: 'Jul', members: 950, events: 55, engagement: 95 },
];

const pieData = [
  { name: 'Active', value: 580 },
  { name: 'Inactive', value: 220 },
  { name: 'New', value: 150 },
];

const COLORS = ['#D32F2F', '#757575', '#BDBDBD'];

const KPICard = ({ title, value, change, icon, color }) => (
  <Card elevation={0} sx={{ border: 1, borderColor: 'divider', height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: `${color}.light`,
            color: `${color}.main`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        {change && (
          <Box sx={{ display: 'flex', alignItems: 'center', color: change > 0 ? 'success.main' : 'error.main' }}>
            {change > 0 ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
            <Typography variant="body2" fontWeight="bold">
              {Math.abs(change)}%
            </Typography>
          </Box>
        )}
      </Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const Analytics = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState('Last 6 Months');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (value) => {
    if (value) setPeriod(value);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Overview of community growth and engagement
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<CalendarIcon />}
            onClick={handleOpenMenu}
            sx={{ bgcolor: 'background.paper' }}
          >
            {period}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleCloseMenu(null)}
          >
            <MenuItem onClick={() => handleCloseMenu('Last 7 Days')}>Last 7 Days</MenuItem>
            <MenuItem onClick={() => handleCloseMenu('Last 30 Days')}>Last 30 Days</MenuItem>
            <MenuItem onClick={() => handleCloseMenu('Last 6 Months')}>Last 6 Months</MenuItem>
            <MenuItem onClick={() => handleCloseMenu('Year to Date')}>Year to Date</MenuItem>
          </Menu>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Export Report
          </Button>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Total Members" 
            value="1,245" 
            change={12} 
            icon={<PeopleIcon />} 
            color="primary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Total Events" 
            value="156" 
            change={-5} 
            icon={<EventIcon />} 
            color="secondary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Page Views" 
            value="45.2k" 
            change={28} 
            icon={<VisibilityIcon />} 
            color="info" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard 
            title="Avg. Engagement" 
            value="78%" 
            change={8} 
            icon={<TrendingUpIcon />} 
            color="success" 
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        {/* Main Growth Chart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, height: 450, border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Member Growth Trend
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9e9e9e' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9e9e9e' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="members" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorMembers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Member Status Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, height: 450, border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Member Distribution
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              {pieData.map((entry, index) => (
                <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLORS[index % COLORS.length] }} />
                  <Typography variant="caption" color="text.secondary">
                    {entry.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

         {/* Event Participation Bar Chart */}
         <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, height: 400, border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Event Participation vs Events Held
              </Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={40}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9e9e9e' }} dy={10} />
                <YAxis yAxisId="left" orientation="left" stroke={theme.palette.primary.main} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke={theme.palette.secondary.main} axisLine={false} tickLine={false} />
                <Tooltip 
                   cursor={{ fill: 'transparent' }}
                   contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="members" name="Participants" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="events" name="Events Held" fill={theme.palette.grey[700]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
