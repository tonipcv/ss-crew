'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  PieChart,
  Search,
  Calendar,
  TrendingUp,
  Filter,
  LineChart
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';

// Interface para o tipo Trade
interface Trade {
  data: string;
  ativo: string;
  direcao: string;
  percentual: number;
  alvo: string | number;
}

// Função para formatar a data de maneira consistente
const formatDate = (dateString: string) => {
  // Verifica se a data já está no formato dd/mm/yyyy
  if (dateString.includes('/')) {
    return dateString;
  }
  
  // Se não estiver, converte do formato ISO
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Home() {
  const [initialTrades, setInitialTrades] = useState<Trade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getTrades() {
      try {
        console.log('Tentando conectar à API...');
        const response = await fetch('https://service-relatorio-server-api.dpbdp1.easypanel.host/api/trades');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }
        
        const trades = await response.json();
        console.log(`Encontrados ${trades.length} trades`);
        
        const validTrades = trades.filter((trade: Trade) => {
          return trade.data !== null &&
                 trade.ativo !== null &&
                 trade.direcao !== null &&
                 trade.percentual !== null &&
                 trade.alvo !== null;
        });

        setInitialTrades(validTrades);
        setLoading(false);
      } catch (error) {
        console.error('Erro detalhado:', error);
        setLoading(false);
      }
    }

    getTrades();
  }, []);

  const months = [
    { number: 8, name: 'Agosto' },
    { number: 9, name: 'Setembro' },
    { number: 10, name: 'Outubro' },
    { number: 11, name: 'Novembro' },
    { number: 12, name: 'Dezembro' }
  ];

  const filteredData = initialTrades.filter(trade => {
    const matchesSearch = trade.ativo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDirection = selectedDirection === 'ALL' || trade.direcao === selectedDirection;
    
    const tradeDate = new Date(trade.data);
    const tradeMonth = tradeDate.getMonth() + 1;
    const matchesMonth = tradeMonth === selectedMonth;
    
    if (selectedMonth !== 11 && selectedMonth !== 12) {
        return matchesSearch && matchesDirection && matchesMonth;
    }
    return false;
  }).concat(
    selectedMonth === 11 ? [
        {"data": "01/11/2024", "ativo": "SUI/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "01/11/2024", "ativo": "TROY/USDT", "direcao": "LONG", "percentual": 140.40, "alvo": "8"},
        {"data": "01/11/2024", "ativo": "SYN/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "01/11/2024", "ativo": "ENA/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "02/11/2024", "ativo": "OGN/USDT", "direcao": "LONG", "percentual": 180.80, "alvo": "10"},
        {"data": "02/11/2024", "ativo": "RARE/USDT", "direcao": "LONG", "percentual": 21.20, "alvo": "2"},
        {"data": "02/11/2024", "ativo": "NEIRO/USDT", "direcao": "LONG", "percentual": 60.20, "alvo": "4"},
        {"data": "02/11/2024", "ativo": "BICO/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "02/11/2024", "ativo": "SANTOS/USDT", "direcao": "LONG", "percentual": 20.20, "alvo": "2"},
        {"data": "03/11/2024", "ativo": "CHR/USDT", "direcao": "LONG", "percentual": 40.20, "alvo": "3"},
        {"data": "03/11/2024", "ativo": "APE/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "03/11/2024", "ativo": "SOL/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "03/11/2024", "ativo": "DODOX/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "03/11/2024", "ativo": "GHTS/USDT", "direcao": "LONG", "percentual": 200.40, "alvo": "11"},
        {"data": "03/11/2024", "ativo": "ZEC/USDT", "direcao": "LONG", "percentual": 40.20, "alvo": "3"},
        {"data": "04/11/2024", "ativo": "SCR/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "04/11/2024", "ativo": "ARB/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "04/11/2024", "ativo": "UXLINK/USDT", "direcao": "LONG", "percentual": 40.20, "alvo": "3"},
        {"data": "04/11/2024", "ativo": "SAGA/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "04/11/2024", "ativo": "TROY/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "05/11/2024", "ativo": "POPCAT/USDT", "direcao": "SHORT", "percentual": 120.00, "alvo": "7"},
        {"data": "05/11/2024", "ativo": "MASK/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "05/11/2024", "ativo": "LTC/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "05/11/2024", "ativo": "ARK/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "06/11/2024", "ativo": "UXLINK/USDT", "direcao": "SHORT", "percentual": -90.00, "alvo": "-"},
        {"data": "06/11/2024", "ativo": "MANA/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "06/11/2024", "ativo": "METIS/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "06/11/2024", "ativo": "MOODENG/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "07/11/2024", "ativo": "RARE/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "07/11/2024", "ativo": "SKL/USDT", "direcao": "LONG", "percentual": 200.20, "alvo": "11"},
        {"data": "07/11/2024", "ativo": "VOXEL/USDT", "direcao": "SHORT", "percentual": 40.40, "alvo": "3"},
        {"data": "08/11/2024", "ativo": "RSR/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "08/11/2024", "ativo": "POL/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "08/11/2024", "ativo": "NOT/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "08/11/2024", "ativo": "STORJ/USDT", "direcao": "LONG", "percentual": 180.40, "alvo": "10"},
        {"data": "09/11/2024", "ativo": "REF/USDT", "direcao": "SHORT", "percentual": 30.10, "alvo": "4"},
        {"data": "09/11/2024", "ativo": "COW/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "09/11/2024", "ativo": "GALA/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "12/11/2024", "ativo": "CRV/USDT", "direcao": "LONG", "percentual": 80.80, "alvo": "5"},
        {"data": "12/11/2024", "ativo": "NEIRO/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "12/11/2024", "ativo": "DOGE/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "13/11/2024", "ativo": "CETUS/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "13/11/2024", "ativo": "SUI/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "13/11/2024", "ativo": "IOTX/USDT", "direcao": "LONG", "percentual": 60.20, "alvo": "4"},
        {"data": "13/11/2024", "ativo": "MOODENG/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "14/11/2024", "ativo": "BNX/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "14/11/2024", "ativo": "1000RATS/USDT", "direcao": "LONG", "percentual": 120.00, "alvo": "7"},
        {"data": "14/11/2024", "ativo": "GOAT/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "14/11/2024", "ativo": "PNUT/USDT", "direcao": "SHORT", "percentual": 100.00, "alvo": "6"},
        {"data": "15/11/2024", "ativo": "HMSTR/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "16/11/2024", "ativo": "GOAT/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "16/11/2024", "ativo": "HBAR/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "16/11/2024", "ativo": "IOTX/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "16/11/2024", "ativo": "1INCH/USDT", "direcao": "SHORT", "percentual": 80.00, "alvo": "5"},
        {"data": "16/11/2024", "ativo": "HIPPO/USDT", "direcao": "SHORT", "percentual": 60.20, "alvo": "4"},
        {"data": "17/11/2024", "ativo": "ALGO/USDT", "direcao": "LONG", "percentual": 201.00, "alvo": "11"},
        {"data": "17/11/2024", "ativo": "GOAT/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "17/11/2024", "ativo": "CRV/USDT", "direcao": "LONG", "percentual": 205.60, "alvo": "11"},
        {"data": "17/11/2024", "ativo": "GRASS/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "17/11/2024", "ativo": "XTZ/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "18/11/2024", "ativo": "KAVA/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "18/11/2024", "ativo": "ANKR/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "18/11/2024", "ativo": "XVG/USDT", "direcao": "LONG", "percentual": 120.00, "alvo": "7"},
        {"data": "18/11/2024", "ativo": "GOAT/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "19/11/2024", "ativo": "BRETT/USDT", "direcao": "SHORT", "percentual": 200.00, "alvo": "11"},
        {"data": "19/11/2024", "ativo": "PEOPLE/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "19/11/2024", "ativo": "FIO/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "19/11/2024", "ativo": "HOT/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "20/11/2024", "ativo": "LDO/USDT", "direcao": "LONG", "percentual": 100.00, "alvo": "6"},
        {"data": "21/11/2024", "ativo": "CRV/USDT", "direcao": "SHORT", "percentual": -90.00, "alvo": "-"},
        {"data": "21/11/2024", "ativo": "MOODENG/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "21/11/2024", "ativo": "SUISHI/USDT", "direcao": "SHORT", "percentual": 40.00, "alvo": "3"},
        {"data": "21/11/2024", "ativo": "IO/USDT", "direcao": "LONG", "percentual": 200.20, "alvo": "11"},
        {"data": "21/11/2024", "ativo": "EIGEN/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "21/11/2024", "ativo": "ACT/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "22/11/2024", "ativo": "INJ/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "22/11/2024", "ativo": "10000MOG/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "22/11/2024", "ativo": "1MBABYDOGE/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "22/11/2024", "ativo": "1000SATS/USDT", "direcao": "LONG", "percentual": 100.00, "alvo": "6"},
        {"data": "23/11/2024", "ativo": "LRC/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "23/11/2024", "ativo": "1000PEPE/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "23/11/2024", "ativo": "ATA/USDT", "direcao": "LONG", "percentual": 40.80, "alvo": "3"},
        {"data": "23/11/2024", "ativo": "MANTA/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "24/11/2024", "ativo": "DYM/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "24/11/2024", "ativo": "SAGA/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "24/11/2024", "ativo": "SANTOS/USDT", "direcao": "SHORT", "percentual": 100.40, "alvo": "6"},
        {"data": "24/11/2024", "ativo": "NEAR/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "24/11/2024", "ativo": "ALICE/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "24/11/2024", "ativo": "YGG/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "25/11/2024", "ativo": "AVAX/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "25/11/2024", "ativo": "MKR/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "25/11/2024", "ativo": "GALA/USDT", "direcao": "LONG", "percentual": 120.20, "alvo": "7"},
        {"data": "25/11/2024", "ativo": "EOS/USDT", "direcao": "LONG", "percentual": 140.60, "alvo": "7"},
        {"data": "26/11/2024", "ativo": "OP/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "26/11/2024", "ativo": "WIF/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "26/11/2024", "ativo": "HIFI/USDT", "direcao": "LONG", "percentual": 180.00, "alvo": "10"},
        {"data": "26/11/2024", "ativo": "DYM/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "26/11/2024", "ativo": "KAVA/USDT", "direcao": "LONG", "percentual": 180.00, "alvo": "10"},
        {"data": "26/11/2024", "ativo": "IOTX/USDT", "direcao": "LONG", "percentual": 180.00, "alvo": "10"},
        {"data": "27/11/2024", "ativo": "ZEC/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "27/11/2024", "ativo": "LDO/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "28/11/2024", "ativo": "MORPHO/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "28/11/2024", "ativo": "VANRY/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "28/11/2024", "ativo": "SNX/USDT", "direcao": "LONG", "percentual": 140.20, "alvo": "8"},
        {"data": "28/11/2024", "ativo": "XTZ/USDT", "direcao": "LONG", "percentual": 60.60, "alvo": "4"},
        {"data": "28/11/2024", "ativo": "ETH/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "28/11/2024", "ativo": "ARKM/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "29/11/2024", "ativo": "XLM/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
    ].filter(trade => 
        trade.ativo.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDirection === 'ALL' || trade.direcao === selectedDirection)
    ) : selectedMonth === 12 ? [
        {"data": "01/12/2024", "ativo": "BLUR/USDT", "direcao": "SHORT", "percentual": 200.00, "alvo": "11"},
        {"data": "01/12/2024", "ativo": "IO/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "01/12/2024", "ativo": "DOGE/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "02/12/2024", "ativo": "XLM/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "02/12/2024", "ativo": "GTM/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "03/12/2024", "ativo": "JASMY/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "03/12/2024", "ativo": "ADA/USDT", "direcao": "LONG", "percentual": 100.00, "alvo": "6"},
        {"data": "03/12/2024", "ativo": "ALT/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "03/12/2024", "ativo": "MEW/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "04/12/2024", "ativo": "THE/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "04/12/2024", "ativo": "GALA/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "04/12/2024", "ativo": "LINK/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "04/12/2024", "ativo": "RLP/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "05/12/2024", "ativo": "OTX/USDT", "direcao": "SHORT", "percentual": 40.00, "alvo": "3"},
        {"data": "05/12/2024", "ativo": "ICP/USDT", "direcao": "LONG", "percentual": 120.00, "alvo": "7"},
        {"data": "05/12/2024", "ativo": "ARK/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "05/12/2024", "ativo": "SWELL/USDT", "direcao": "LONG", "percentual": 100.20, "alvo": "6"},
        {"data": "06/12/2024", "ativo": "RENDER/USDT", "direcao": "LONG", "percentual": 120.00, "alvo": "7"},
        {"data": "06/12/2024", "ativo": "FTM/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "06/12/2024", "ativo": "OMNI/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "06/12/2024", "ativo": "XRP/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "07/12/2024", "ativo": "OP/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "07/12/2024", "ativo": "WIF/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "08/12/2024", "ativo": "1000PEPE/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "08/12/2024", "ativo": "LOKA/USDT", "direcao": "SHORT", "percentual": 40.00, "alvo": "3"},
        {"data": "09/12/2024", "ativo": "RSR/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "09/12/2024", "ativo": "FIO/USDT", "direcao": "LONG", "percentual": 80.20, "alvo": "5"},
        {"data": "09/12/2024", "ativo": "CELO/USDT", "direcao": "LONG", "percentual": 21.00, "alvo": "2"},
        {"data": "09/12/2024", "ativo": "1MBABYDOGE/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "09/12/2024", "ativo": "CRV/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "09/12/2024", "ativo": "DOT/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "09/12/2024", "ativo": "1000FLOKI/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "09/12/2024", "ativo": "1MBABYDOGE/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "10/12/2024", "ativo": "ONE/USDT", "direcao": "SHORT", "percentual": 200.00, "alvo": "11"},
        {"data": "10/12/2024", "ativo": "AMB/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "10/12/2024", "ativo": "MTL/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "10/12/2024", "ativo": "COW/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "10/12/2024", "ativo": "ATOM/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "10/12/2024", "ativo": "MOVE/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "10/12/2024", "ativo": "ATA/USDT", "direcao": "LONG", "percentual": 201.40, "alvo": "11"},
        {"data": "11/12/2024", "ativo": "COTI/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "11/12/2024", "ativo": "AAVE/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "11/12/2024", "ativo": "ZRO/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "12/12/2024", "ativo": "DYM/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "12/12/2024", "ativo": "CHESS/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "12/12/2024", "ativo": "TLM/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "12/12/2024", "ativo": "ALPACA/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "14/12/2024", "ativo": "BB/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "14/12/2024", "ativo": "BICO/USDT", "direcao": "LONG", "percentual": 140.40, "alvo": "8"},
        {"data": "14/12/2024", "ativo": "ZK/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "14/12/2024", "ativo": "MORPHO/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "14/12/2024", "ativo": "DOGE/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "14/12/2024", "ativo": "ENA/USDT", "direcao": "SHORT", "percentual": 120.00, "alvo": "7"},
        {"data": "14/12/2024", "ativo": "XVG/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "21/12/2024", "ativo": "ZRO/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "21/12/2024", "ativo": "CHR/USDT", "direcao": "LONG", "percentual": 20.20, "alvo": "2"},
        {"data": "21/12/2024", "ativo": "BICO/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "21/12/2024", "ativo": "IO/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "21/12/2024", "ativo": "PENGU/USDT", "direcao": "LONG", "percentual": 100.00, "alvo": "6"},
        {"data": "21/12/2024", "ativo": "SOL/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "21/12/2024", "ativo": "BAN/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "22/12/2024", "ativo": "ACH/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "22/12/2024", "ativo": "BCH/USDT", "direcao": "LONG", "percentual": 140.00, "alvo": "8"},
        {"data": "22/12/2024", "ativo": "DEGEN/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "22/12/2024", "ativo": "PNUT/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "22/12/2024", "ativo": "AGLD/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "22/12/2024", "ativo": "STEEM/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "22/12/2024", "ativo": "SUSHI/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "22/12/2024", "ativo": "REZ/USDT", "direcao": "LONG", "percentual": 200.40, "alvo": "11"},
        {"data": "22/12/2024", "ativo": "C98/USDT", "direcao": "LONG", "percentual": 200.60, "alvo": "11"},
        {"data": "22/12/2024", "ativo": "XLM/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "23/12/2024", "ativo": "CGPT/USDT", "direcao": "LONG", "percentual": 60.00, "alvo": "4"},
        {"data": "23/12/2024", "ativo": "VIRTUAL/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "23/12/2024", "ativo": "10000MOG/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "23/12/2024", "ativo": "MOODENG/USDT", "direcao": "LONG", "percentual": 180.00, "alvo": "10"},
        {"data": "23/12/2024", "ativo": "ETH/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "24/12/2024", "ativo": "PENGU/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "24/12/2024", "ativo": "LINK/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "24/12/2024", "ativo": "DYDX/USDT", "direcao": "LONG", "percentual": 120.60, "alvo": "7"},
        {"data": "24/12/2024", "ativo": "SFP/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "24/12/2024", "ativo": "HBAR/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "24/12/2024", "ativo": "1000RATS/USDT", "direcao": "LONG", "percentual": 60.20, "alvo": "4"},
        {"data": "24/12/2024", "ativo": "ADA/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "24/12/2024", "ativo": "LUMIA/USDT", "direcao": "LONG", "percentual": 60.60, "alvo": "4"},
        {"data": "25/12/2024", "ativo": "AIXB/USDT", "direcao": "LONG", "percentual": 100.00, "alvo": "6"},
        {"data": "25/12/2024", "ativo": "COW/USDT", "direcao": "LONG", "percentual": 100.00, "alvo": "6"},
        {"data": "25/12/2024", "ativo": "KOMA/USDT", "direcao": "LONG", "percentual": 100.00, "alvo": "6"},
        {"data": "25/12/2024", "ativo": "ME/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "25/12/2024", "ativo": "CRV/USDT", "direcao": "LONG", "percentual": 21.60, "alvo": "2"},
        {"data": "26/12/2024", "ativo": "DODX/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "26/12/2024", "ativo": "ZEC/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "26/12/2024", "ativo": "MOVE/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "26/12/2024", "ativo": "ZEN/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "26/12/2024", "ativo": "MOODENG/USDT", "direcao": "LONG", "percentual": 80.00, "alvo": "5"},
        {"data": "26/12/2024", "ativo": "LIT/USDT", "direcao": "LONG", "percentual": 201.40, "alvo": "11"},
        {"data": "27/12/2024", "ativo": "STEEM/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "27/12/2024", "ativo": "THE/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "27/12/2024", "ativo": "VIDT/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"},
        {"data": "27/12/2024", "ativo": "NEAR/USDT", "direcao": "LONG", "percentual": 60.20, "alvo": "4"},
        {"data": "28/12/2024", "ativo": "SSV/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "28/12/2024", "ativo": "MOODENG/USDT", "direcao": "LONG", "percentual": 160.00, "alvo": "9"},
        {"data": "28/12/2024", "ativo": "LIT/USDT", "direcao": "LONG", "percentual": -90.00, "alvo": "-"},
        {"data": "29/12/2024", "ativo": "ICP/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "29/12/2024", "ativo": "XTZ/USDT", "direcao": "LONG", "percentual": 20.60, "alvo": "2"},
        {"data": "29/12/2024", "ativo": "CRV/USDT", "direcao": "LONG", "percentual": 20.20, "alvo": "2"},
        {"data": "29/12/2024", "ativo": "AVA/USDT", "direcao": "LONG", "percentual": 120.00, "alvo": "7"},
        {"data": "30/12/2024", "ativo": "NEIROETH/USDT", "direcao": "LONG", "percentual": 40.20, "alvo": "3"},
        {"data": "30/12/2024", "ativo": "SXP/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "30/12/2024", "ativo": "BAN/USDT", "direcao": "LONG", "percentual": 41.60, "alvo": "3"},
        {"data": "30/12/2024", "ativo": "QNT/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "30/12/2024", "ativo": "HOOK/USDT", "direcao": "LONG", "percentual": 60.40, "alvo": "4"},
        {"data": "30/12/2024", "ativo": "ALICE/USDT", "direcao": "LONG", "percentual": 80.80, "alvo": "5"},
        {"data": "31/12/2024", "ativo": "ACTION/USDT", "direcao": "LONG", "percentual": 40.00, "alvo": "3"},
        {"data": "31/12/2024", "ativo": "MEU/USDT", "direcao": "LONG", "percentual": 20.40, "alvo": "2"},
        {"data": "31/12/2024", "ativo": "CGPT/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "31/12/2024", "ativo": "1000BONK/USDT", "direcao": "LONG", "percentual": 20.00, "alvo": "2"},
        {"data": "31/12/2024", "ativo": "TROY/USDT", "direcao": "LONG", "percentual": 200.00, "alvo": "11"}
    ].filter(trade => 
        trade.ativo.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDirection === 'ALL' || trade.direcao === selectedDirection)
    ) : []
  );

  const totalOperacoes = filteredData.length;
  const operacoesLucrativas = filteredData.filter(t => t.percentual > 0).length;

  const taxaAcerto = totalOperacoes > 0 ? ((operacoesLucrativas / totalOperacoes) * 100) : 0;

  const valorizacaoTotal = Number(filteredData.reduce((acc, curr) => {
    const valor = typeof curr.percentual === 'string' 
      ? parseFloat(curr.percentual) 
      : curr.percentual;
    return acc + valor;
  }, 0));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <p className="text-white">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] text-gray-200">
      <header className="fixed top-0 w-full bg-[#111]/90 backdrop-blur-sm z-50 px-4 py-3">
        <div className="flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center">
            <Image src="/ft-icone.png" alt="Futuros Tech Logo" width={40} height={40} />
          </Link>
        </div>
      </header>

      <main className="pt-14 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-24">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
                    <LineChart className="h-5 w-5 text-green-300" />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold leading-6 text-white">
                      Relatório de Trades
                    </h1>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Análise detalhada de {initialTrades.length} operações
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:flex-none">
              <div className="flex space-x-4">
                <select
                  className="rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={selectedDirection}
                  onChange={(e) => setSelectedDirection(e.target.value as 'ALL' | 'LONG' | 'SHORT')}
                >
                  <option value="ALL">Todas Direções</option>
                  <option value="LONG">LONG</option>
                  <option value="SHORT">SHORT</option>
                </select>
                <input
                  type="text"
                  placeholder="Buscar ativo..."
                  className="rounded-md bg-gray-800 text-gray-200 px-4 py-2 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Abas dos meses */}
          <div className="mt-8 border-b border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Months">
              {months.map((month) => (
                <button
                  key={month.number}
                  onClick={() => setSelectedMonth(month.number)}
                  className={`
                    whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors
                    ${selectedMonth === month.number
                      ? 'border-green-300 text-green-300'
                      : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
                    }
                  `}
                >
                  {month.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Cards de estatísticas */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <PieChart className="h-4 w-4 text-green-300" strokeWidth={1.5} />
                  <span className="text-sm text-gray-400">Win Rate</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {taxaAcerto.toFixed(1)}%
                  </span>
                  <span className="text-xs text-gray-500">
                    {operacoesLucrativas}/{totalOperacoes}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" strokeWidth={1.5} />
                  <span className="text-sm text-gray-400">Resultado Total</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {valorizacaoTotal > 0 ? '+' : ''}{valorizacaoTotal.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="h-4 w-4 text-green-400" strokeWidth={1.5} />
                  <span className="text-sm text-gray-400">Total de Sinais</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {totalOperacoes}
                  </span>
                  <span className="text-xs text-gray-500">operações</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de operações */}
          <div className="mt-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-base font-semibold leading-6 text-white">Operações</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Lista detalhada de todas as operações realizadas
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-0">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" strokeWidth={1.5} />
                            Data
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4" strokeWidth={1.5} />
                            Ativo
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" strokeWidth={1.5} />
                            Direção
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" strokeWidth={1.5} />
                            Resultado
                          </div>
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">Alvo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredData.map((trade, index) => (
                        <tr key={index} className="hover:bg-gray-800/50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-0">
                            {formatDate(trade.data)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-300">
                            {trade.ativo}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              trade.direcao === 'LONG'
                                ? 'bg-green-400/10 text-green-400 ring-green-400/20'
                                : 'bg-red-400/10 text-red-400 ring-red-400/20'
                            }`}>
                              {trade.direcao}
                            </span>
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 text-sm ${
                            trade.percentual >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {trade.percentual >= 0 ? '+' : ''}{trade.percentual}%
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {trade.alvo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
