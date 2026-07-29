import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, TextField, Button, Paper,
  Chip, LinearProgress, Divider, Tab, Tabs, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import financialIntelligenceEngine from '../../services/financialEngine/FinancialIntelligenceEngine';

export const FinancialIntelligenceView = () => {
  const [selectedTicker, setSelectedTicker] = useState('INFY');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const dossier = useMemo(() => {
    return financialIntelligenceEngine.generateResearchDossier(selectedTicker);
  }, [selectedTicker]);

  const handleSelectTicker = (ticker) => {
    setSelectedTicker(ticker);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedTicker(searchQuery.trim().toUpperCase());
    }
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #ab47bc', pl: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AccountBalanceIcon sx={{ color: '#ab47bc', fontSize: '2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Financial Intelligence Terminal
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Institutional equity research engine — ratios explained with historical trends, peer comparisons & AI interpretations.
        </Typography>
      </Box>

      {/* ── Stock Selector Bar ── */}
      <Card sx={{ mb: 3, border: '1px solid #2a2e39', bgcolor: '#111524' }}>
        <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['INFY', 'TCS', 'RELIANCE', 'HDFCBANK'].map((t) => (
              <Chip
                key={t}
                label={t}
                clickable
                color={selectedTicker === t ? 'primary' : 'default'}
                onClick={() => handleSelectTicker(t)}
                sx={{ fontWeight: 800, px: 1 }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search ticker (e.g. TCS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ width: 220 }}
            />
            <Button variant="contained" onClick={handleSearch} startIcon={<SearchIcon />}>
              Analyze
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ── Top Executive Dossier Banner ── */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Chip label={dossier.profile.sector} color="primary" size="small" sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
              <Chip label={dossier.profile.marketCapCategory} variant="outlined" size="small" sx={{ fontWeight: 700, fontSize: '0.65rem', borderColor: '#2a2e39' }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#f0f3fa', mb: 0.5 }}>
              {dossier.profile.name} ({dossier.profile.symbol})
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              CMP: <strong>₹{dossier.profile.cmp}</strong> • Market Cap: {dossier.profile.marketCap}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>QUALITY SCORE</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#089981' }}>{dossier.quality.overall}/100</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>{dossier.quality.rating.split(' - ')[0]}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>FAIR INTRINSIC VALUE</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#2962ff' }}>₹{dossier.valuation.intrinsicValue}</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem', color: dossier.valuation.marginOfSafetyPct > 0 ? '#089981' : '#ef5350', fontWeight: 800 }}>
                    {dossier.valuation.marginOfSafetyPct > 0 ? `+${dossier.valuation.marginOfSafetyPct}% MoS` : `${dossier.valuation.marginOfSafetyPct}% MoS`}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>ECONOMIC MOAT</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#ab47bc' }}>{dossier.moat.moatScore}/100</Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary', fontWeight: 700 }}>{dossier.moat.moatRating}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>FORENSIC RISK</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: dossier.risk.riskLevel === 'LOW RISK' ? '#089981' : '#f9a825' }}>
                    {dossier.risk.riskLevel.split(' ')[0]}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>{dossier.risk.riskScore}% Pass</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Main Research Tabs ── */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3, borderBottom: '1px solid #2a2e39', '& .MuiTab-root': { fontSize: '0.8rem', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: '#ab47bc' } }}>
        <Tab label="📊 Ratios & AI Commentary" />
        <Tab label="🏢 Company Profile & Mix" />
        <Tab label="🎯 Valuation & DCF" />
        <Tab label="⚔️ Competitor Matrix" />
        <Tab label="🏰 Economic Moat" />
        <Tab label="🛡️ Forensic Risk Audit" />
        <Tab label="📄 AI Concall & Report Reader" />
      </Tabs>

      {/* ── TAB 0: Ratios with AI Commentary ── */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {[
            { title: 'VALUATION RATIOS', items: dossier.ratios.valuation, color: '#2962ff' },
            { title: 'PROFITABILITY RATIOS', items: dossier.ratios.profitability, color: '#089981' },
            { title: 'SOLVENCY & CASH FLOW RATIOS', items: dossier.ratios.solvencyAndEfficiency, color: '#ab47bc' },
          ].map((sec, idx) => (
            <Grid item xs={12} key={idx}>
              <Card sx={{ border: `1px solid ${sec.color}40`, bgcolor: '#111524' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: sec.color, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShowChartIcon sx={{ fontSize: '1.2rem' }} /> {sec.title}
                  </Typography>
                  <Grid container spacing={2}>
                    {sec.items.map((r, i) => (
                      <Grid item xs={12} md={6} key={i}>
                        <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{r.name}</Typography>
                            <Chip label={r.value} color="primary" size="small" sx={{ fontWeight: 900, fontSize: '0.8rem' }} />
                          </Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, lineHeight: 1.4 }}>
                            {r.explanation}
                          </Typography>
                          <Divider sx={{ borderColor: '#2a2e39', my: 1 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>Trend: <strong>{r.trend}</strong></Typography>
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>Peer Avg: <strong>{r.peerAvg}</strong></Typography>
                          </Box>
                          <Box sx={{ p: 1.25, bgcolor: 'rgba(171,71,188,0.06)', borderRadius: 1, borderLeft: '3px solid #ab47bc' }}>
                            <Typography variant="caption" sx={{ color: '#ab47bc', fontWeight: 800, display: 'block', mb: 0.25, fontSize: '0.62rem' }}>
                              AI INTERPRETATION & RELEVANCE
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.primary', lineHeight: 1.4, display: 'block', fontSize: '0.72rem' }}>
                              {r.interpretation} {r.relevance}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── TAB 1: Company Profile & Revenue Mix ── */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon sx={{ color: '#2962ff' }} /> Business Profile & Overview
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3 }}>
                  {dossier.profile.businessDescription}
                </Typography>

                <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 1, letterSpacing: '0.06em' }}>
                  MANAGEMENT & GOVERNANCE
                </Typography>
                {[
                  { label: 'CEO', value: dossier.profile.management.ceo },
                  { label: 'CFO', value: dossier.profile.management.cfo },
                  { label: 'Chairman', value: dossier.profile.management.chairman },
                  { label: 'Board Independence', value: dossier.profile.management.boardIndependence },
                  { label: 'Promoter Holding', value: `${dossier.profile.management.promoterHolding}%` },
                  { label: 'Promoter Pledge', value: `${dossier.profile.management.promoterPledge}%` },
                  { label: 'FII Holding', value: `${dossier.profile.management.fiiHolding}%` },
                  { label: 'DII Holding', value: `${dossier.profile.management.diiHolding}%` },
                ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid #2a2e39' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.label}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>{item.value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Business Segment Breakdown</Typography>
                {dossier.profile.businessMix?.map((mix, i) => (
                  <Box key={i} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{mix.segment}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.light' }}>{mix.pct}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={mix.pct} sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { bgcolor: '#2962ff' } }} />
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Geographical Revenue Split</Typography>
                {dossier.profile.geographicalMix?.map((geo, i) => (
                  <Box key={i} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{geo.region}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#089981' }}>{geo.pct}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={geo.pct} sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { bgcolor: '#089981' } }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 2: DCF Valuation & Fair Value ── */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>DCF Intrinsic Value & Fair Value Range</Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>CONSERVATIVE LOW</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.secondary' }}>₹{dossier.valuation.fairValueRange.low}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#0d1117', border: '2px solid #2962ff' }}>
                      <Typography variant="caption" sx={{ color: 'primary.light', fontSize: '0.65rem', fontWeight: 800 }}>TARGET FAIR VALUE</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: '#2962ff' }}>₹{dossier.valuation.fairValueRange.target}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>BULL CASE HIGH</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: 'success.main' }}>₹{dossier.valuation.fairValueRange.high}</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 1 }}>
                    DCF MODEL PARAMETERS
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>• Discount Rate (WACC): 11.0%</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>• 5-Year FCF CAGR Assumption: {dossier.profile.growth.fcfGrowth3Y}%</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>• Terminal P/E Multiple: 18.0x</Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>AI Valuation Verdict</Typography>
                <Paper sx={{ p: 2, bgcolor: 'rgba(41,98,255,0.06)', borderLeft: '3px solid #2962ff', mb: 3 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, color: 'text.primary' }}>
                    {dossier.valuation.aiVerdict}
                  </Typography>
                </Paper>

                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, display: 'block', mb: 1 }}>
                  HISTORICAL MULTIPLE COMPARISON
                </Typography>
                <Box sx={{ p: 1.5, bgcolor: '#0d1117', borderRadius: 1, border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 0.5 }}>
                    5-Year P/E Range: {dossier.valuation.historicalValuation.pe5YMin}x - {dossier.valuation.historicalValuation.pe5YMax}x (Avg: {dossier.valuation.historicalValuation.pe5YAvg}x)
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: 'success.main', fontWeight: 700 }}>
                    Current P/E of {dossier.valuation.historicalValuation.currentPe}x is at a {dossier.valuation.historicalValuation.discountToHistoricalAvg}% discount to 5-year average.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 3: Competitor Peer Matrix ── */}
      {activeTab === 3 && (
        <Card sx={{ border: '1px solid #2a2e39' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Head-to-Head Peer Comparison Matrix</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': { borderColor: '#2a2e39', color: 'text.secondary', fontSize: '0.7rem' } }}>
                    <TableCell>Company</TableCell>
                    <TableCell align="right">CMP (₹)</TableCell>
                    <TableCell align="right">P/E</TableCell>
                    <TableCell align="right">P/B</TableCell>
                    <TableCell align="right">ROE %</TableCell>
                    <TableCell align="right">ROCE %</TableCell>
                    <TableCell align="right">OPM %</TableCell>
                    <TableCell align="right">3Y Rev CAGR %</TableCell>
                    <TableCell align="right">D/E</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dossier.peers.matrix?.map((p, i) => (
                    <TableRow key={i} sx={{ bgcolor: p.symbol === selectedTicker ? 'rgba(41,98,255,0.08)' : 'transparent', '& td': { borderColor: '#2a2e39', fontSize: '0.75rem' } }}>
                      <TableCell sx={{ fontWeight: 800, color: p.symbol === selectedTicker ? 'primary.light' : 'text.primary' }}>
                        {p.name} ({p.symbol})
                      </TableCell>
                      <TableCell align="right">₹{p.cmp}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800 }}>{p.pe}x</TableCell>
                      <TableCell align="right">{p.pb}x</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#089981' }}>{p.roe}%</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#089981' }}>{p.roce}%</TableCell>
                      <TableCell align="right">{p.opm}%</TableCell>
                      <TableCell align="right">{p.revGrowth}%</TableCell>
                      <TableCell align="right">{p.debtEquity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Paper sx={{ p: 2, mt: 3, bgcolor: 'rgba(8,153,129,0.06)', borderLeft: '3px solid #089981' }}>
              <Typography variant="caption" sx={{ color: '#089981', fontWeight: 800, display: 'block', mb: 0.5 }}>
                PEER GROUP SUMMARY
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                {dossier.peers.aiAnalysis.summary}
              </Typography>
            </Paper>
          </CardContent>
        </Card>
      )}

      {/* ── TAB 4: Economic Moat ── */}
      {activeTab === 4 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShieldIcon sx={{ color: '#ab47bc' }} /> Moat Rating & Score
                </Typography>
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h2" sx={{ fontWeight: 900, color: '#ab47bc' }}>{dossier.moat.moatScore}/100</Typography>
                  <Chip label={dossier.moat.moatRating} color="primary" sx={{ fontWeight: 800, mt: 1 }} />
                </Box>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.6, display: 'block' }}>
                    {dossier.moat.aiMoatThesis}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>6-Factor Competitive Advantage Audit</Typography>
                {dossier.moat.drivers?.map((d, i) => (
                  <Paper key={i} sx={{ p: 2, mb: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{d.name}</Typography>
                      <Chip label={`${d.score}/100 (${d.status})`} size="small" sx={{ fontSize: '0.65rem', fontWeight: 800, bgcolor: 'rgba(171,71,188,0.15)', color: '#ab47bc' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{d.detail}</Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 5: Forensic Risk Audit ── */}
      {activeTab === 5 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ color: dossier.risk.color + '.main' }} /> Forensic Accounting Audit
                </Typography>
                {dossier.risk.checks?.map((c, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', py: 1.25, borderBottom: '1px solid #2a2e39' }}>
                    {c.pass ? <CheckCircleIcon sx={{ color: '#089981' }} /> : <WarningIcon sx={{ color: '#ef5350' }} />}
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{c.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>{c.detail}</Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Forensic Audit Verdict</Typography>
                <Paper sx={{ p: 2, bgcolor: 'rgba(8,153,129,0.06)', borderLeft: '3px solid #089981', mb: 3 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {dossier.risk.forensicSummary}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 6: AI Concall & Report Reader ── */}
      {activeTab === 6 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon sx={{ color: '#2962ff' }} /> Executive Summary: {dossier.docAnalysis.docType}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3 }}>
                  {dossier.docAnalysis.executiveSummary}
                </Typography>

                <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 1, letterSpacing: '0.06em' }}>
                  KEY EARNINGS HIGHLIGHTS
                </Typography>
                {dossier.docAnalysis.keyHighlights?.map((h, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <CheckCircleIcon sx={{ color: '#089981', fontSize: '1rem', flexShrink: 0, mt: '2px' }} />
                    <Typography variant="caption" sx={{ color: 'text.primary', lineHeight: 1.5 }}>{h}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Management Commentary Quotes</Typography>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>
                    CEO COMMENTARY
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.5, display: 'block' }}>
                    "{dossier.docAnalysis.managementCommentary?.ceoRemark}"
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: '#089981', fontWeight: 800, display: 'block', mb: 0.5 }}>
                    CFO COMMENTARY
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.5, display: 'block' }}>
                    "{dossier.docAnalysis.managementCommentary?.cfoRemark}"
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FinancialIntelligenceView;
