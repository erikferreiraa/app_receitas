import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// A API devolve ingredientes em campos separados (strIngredient1..20).
function listarIngredientes(receita) {
  const itens = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = receita[`strIngredient${i}`];
    const medida = receita[`strMeasure${i}`];
    if (ingrediente && ingrediente.trim()) {
      itens.push(`${(medida || '').trim()} ${ingrediente.trim()}`.trim());
    }
  }
  return itens;
}

export default function DetalhesScreen({ route }) {
  const { receita } = route.params;
  const ingredientes = listarIngredientes(receita);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Image source={{ uri: receita.strMealThumb }} style={styles.imagem} />

      <Text style={styles.titulo}>{receita.strMeal}</Text>

      <View style={styles.tags}>
        {!!receita.strCategory && <Text style={styles.tag}>{receita.strCategory}</Text>}
        {!!receita.strArea && <Text style={styles.tag}>{receita.strArea}</Text>}
      </View>

      <Text style={styles.secao}>Ingredientes</Text>
      {ingredientes.map((item, index) => (
        <Text key={index} style={styles.texto}>
          • {item}
        </Text>
      ))}

      <Text style={styles.secao}>Modo de preparo</Text>
      <Text style={styles.texto}>{receita.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  conteudo: { paddingBottom: 32 },
  imagem: { width: '100%', height: 260, backgroundColor: '#eee' },
  titulo: { fontSize: 24, fontWeight: 'bold', margin: 16, marginBottom: 8, color: '#222' },
  tags: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8 },
  tag: {
    backgroundColor: '#ffe8cc',
    color: '#d9480f',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    fontWeight: '600',
    overflow: 'hidden',
  },
  secao: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 6, paddingHorizontal: 16, color: '#222' },
  texto: { fontSize: 15, lineHeight: 22, paddingHorizontal: 16, color: '#333' },
});
