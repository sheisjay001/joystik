import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  FilterList as FilterListIcon 
} from '@mui/icons-material';

const Members = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in a real app, this would come from an API
  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joinDate: '2023-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member', joinDate: '2023-02-20', status: 'Active' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com', role: 'Moderator', joinDate: '2023-03-10', status: 'Inactive' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Member', joinDate: '2023-04-05', status: 'Active' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Member', joinDate: '2023-05-12', status: 'Active' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Member', joinDate: '2023-06-18', status: 'Active' },
    { id: 7, name: 'David Wilson', email: 'david@example.com', role: 'Moderator', joinDate: '2023-07-22', status: 'Active' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', role: 'Member', joinDate: '2023-08-30', status: 'Inactive' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredMembers.length - page * rowsPerPage);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'error';
      case 'Moderator': return 'warning';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Members
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your community members
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ px: 3, py: 1 }}
        >
          Add Member
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search by name, email, or role..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: 'white' }}
        />
        <Button variant="outlined" startIcon={<FilterListIcon />}>
          Filters
        </Button>
      </Paper>

      <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <Table sx={{ minWidth: 650 }} aria-label="members table">
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Member</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Join Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((member) => (
                <TableRow key={member.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        alt={member.name} 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`} 
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {member.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={member.role} 
                      size="small" 
                      color={getRoleColor(member.role)} 
                      variant="outlined" 
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={member.status} 
                      size="small" 
                      color={getStatusColor(member.status)} 
                      sx={{ borderRadius: 1, px: 1 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton size="small" sx={{ mr: 1, color: 'primary.main' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 73 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
            {filteredMembers.length === 0 && (
              <TableRow style={{ height: 200 }}>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="text.secondary">
                    No members found matching your search.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMembers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Members;
