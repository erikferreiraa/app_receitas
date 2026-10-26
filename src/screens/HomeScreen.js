import { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { buscarReceitas } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const lista = await buscarReceitas();
      setReceitas(lista);
    } catch (e) {
      setErro('Não foi possível carregar as receitas. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#e8590c" />
        <Text style={styles.textoAuxiliar}>Carregando receitas...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
        <TouchableOpacity style={styles.botao} onPress={carregar}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={receitas}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.lista}
      ListEmptyComponent={<Text style={styles.textoAuxiliar}>Nenhuma receita encontrada.</Text>}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Detalhes', { receita: item })}
        >
          <Image source={{ uri: item.strMealThumb }} style={styles.imagem} />
          <Text style={styles.nome} numberOfLines={2}>
            {item.strMeal}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imagem: { width: 96, height: 96, backgroundColor: '#eee' },
  nome: { flex: 1, fontSize: 17, fontWeight: '600', padding: 12, color: '#222' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  textoAuxiliar: { marginTop: 12, color: '#666', textAlign: 'center' },
  erro: { color: '#c92a2a', textAlign: 'center', marginBottom: 16, fontSize: 16 },
  botao: { backgroundColor: '#e8590c', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
